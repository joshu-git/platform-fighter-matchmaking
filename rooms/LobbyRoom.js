const { Room } = require("colyseus");
const SmashRoom = require("./SmashRoom");

class LobbyRoom extends Room {
  onCreate(options) {
    console.log("LobbyRoom created");
    this.clientsWaiting = [];
  }

  onJoin(client, options) {
    console.log(`${client.sessionId} joined LobbyRoom`);
    this.clientsWaiting.push(client);

    // Check for available matches
    this.checkMatches();
  }

  onLeave(client, consented) {
    console.log(`${client.sessionId} left LobbyRoom`);
    this.clientsWaiting = this.clientsWaiting.filter(c => c !== client);
  }

  checkMatches() {
    while (this.clientsWaiting.length >= 2) {
      // Example: 2v2 if 4 clients waiting
      let teamAssignments = [];
      let matchClients = [];

      if (this.clientsWaiting.length >= 4) {
        matchClients = this.clientsWaiting.splice(0, 4);
        teamAssignments = [1, 1, 2, 2]; // two teams
      } else {
        matchClients = this.clientsWaiting.splice(0, 2);
        teamAssignments = [1, 2]; // 1v1
      }

      // Create a new SmashRoom
      const roomName = `smash_${Date.now()}`;
      const room = this.createRoom(roomName, matchClients, teamAssignments);
    }
  }

  async createRoom(name, clients, teams) {
    const smashRoom = await this.presence.createRoom("smash", {
      maxClients: clients.length
    });

    clients.forEach((client, index) => {
      smashRoom.onJoin(client, { team: teams[index] });
    });

    console.log(`Created SmashRoom ${name} with ${clients.length} players`);
  }
}

module.exports = LobbyRoom;
