const colyseus = require("colyseus");
const { uWebSocketsTransport } = require("@colyseus/uwebsockets-transport");
const LobbyRoom = require("./rooms/LobbyRoom");
const SmashRoom = require("./rooms/SmashRoom");

const PORT = parseInt(process.env.PORT) || 2567;

// Use the transport directly
const gameServer = new colyseus.Server({
  transport: new uWebSocketsTransport({
    port: PORT
  }),
});

gameServer.define("lobby", LobbyRoom);
gameServer.define("smash", SmashRoom);

gameServer.listen();
console.log(`Colyseus server running on ws://localhost:${PORT}`);
