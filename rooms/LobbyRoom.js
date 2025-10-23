const colyseus = require("colyseus");

class LobbyRoom extends colyseus.Room {
  onCreate(options) {
    this.setState({ players: {} });

    this.onMessage("join", (client, message) => {
      this.state.players[client.sessionId] = { name: message.name, team: 0 };
      this.broadcast("players", this.state.players);
    });

    // Automatically create SmashRoom when enough players join
    this.onMessage("ready", (client) => {
      const readyPlayers = Object.keys(this.state.players);
      if (readyPlayers.length >= 2) {
        const smashRoom = this.simulateSmashRoom(readyPlayers);
        smashRoom.start();
      }
    });
  }

  simulateSmashRoom(playerIds) {
    // placeholder for matchmaking logic
    return { start: () => console.log("SmashRoom started with players:", playerIds) };
  }

  onJoin(client) {
    console.log(client.sessionId, "joined LobbyRoom");
  }

  onLeave(client) {
    delete this.state.players[client.sessionId];
    this.broadcast("players", this.state.players);
  }
}

module.exports = LobbyRoom;
