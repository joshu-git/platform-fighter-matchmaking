const { Room } = require("colyseus");

class SmashRoom extends Room {
  onCreate(options) {
    console.log("SmashRoom created", options);

    this.setState({
      players: {}
    });

    this.onMessage("move", (client, message) => {
      // Update player position
      if (this.state.players[client.sessionId]) {
        this.state.players[client.sessionId] = message;
        this.broadcast("state", this.state);
      }
    });
  }

  onJoin(client, options) {
    console.log(`${client.sessionId} joined SmashRoom`);
    this.state.players[client.sessionId] = { x: 0, y: 0, team: options.team || 1 };
  }

  onLeave(client, consented) {
    console.log(`${client.sessionId} left SmashRoom`);
    delete this.state.players[client.sessionId];
  }

  onDispose() {
    console.log("SmashRoom disposed");
  }
}

module.exports = SmashRoom;
