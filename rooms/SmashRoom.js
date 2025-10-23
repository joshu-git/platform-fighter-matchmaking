const colyseus = require("colyseus");

class SmashRoom extends colyseus.Room {
  onCreate(options) {
    this.setState({ players: {} });

    this.onMessage("move", (client, message) => {
      if (!this.state.players[client.sessionId]) return;
      this.state.players[client.sessionId].x = message.x;
      this.state.players[client.sessionId].y = message.y;
      this.broadcast("move", { id: client.sessionId, x: message.x, y: message.y });
    });

    this.onMessage("attack", (client, message) => {
      if (!this.state.players[client.sessionId]) return;
      this.broadcast("attack", { id: client.sessionId, attack: message.attack });
    });
  }

  onJoin(client) {
    this.state.players[client.sessionId] = { x: 0, y: 0, hp: 100 };
    this.broadcast("players", this.state.players);
    console.log(client.sessionId, "joined SmashRoom");
  }

  onLeave(client) {
    delete this.state.players[client.sessionId];
    this.broadcast("players", this.state.players);
  }
}

module.exports = SmashRoom;
