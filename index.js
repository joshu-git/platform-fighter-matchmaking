const colyseus = require("colyseus");
const { UWebSocketsTransport } = require("@colyseus/uwebsockets-transport");
const LobbyRoom = require("./rooms/LobbyRoom");
const SmashRoom = require("./rooms/SmashRoom");

const PORT = parseInt(process.env.PORT) || 2567;

const gameServer = new colyseus.Server({
  transport: new UWebSocketsTransport({ port: PORT }),
});

// Register rooms
gameServer.define("lobby", LobbyRoom);
gameServer.define("smash", SmashRoom);

gameServer.listen();
console.log(`Colyseus server running on ws://localhost:${PORT}`);
