const colyseus = require("colyseus");
const colyseusTransport = require("@colyseus/uwebsockets-transport");
const LobbyRoom = require("./rooms/LobbyRoom");
const SmashRoom = require("./rooms/SmashRoom");

const PORT = parseInt(process.env.PORT) || 2567;

const gameServer = new colyseus.Server({
  transport: new colyseusTransport.UWebSocketsTransport({ port: PORT }),
});

// Register rooms
gameServer.define("lobby", LobbyRoom);
gameServer.define("smash", SmashRoom);

gameServer.listen();
console.log(`Colyseus server running on ws://localhost:${PORT}`);
