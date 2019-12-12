const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

const wsServer = new WebSocket.Server({
  server
});

wsServer.on('connection', (ws) => {
  console.log('new websocket connection.');

  ws.on('message', (message) => {
    wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.use("/build", express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/example'));

//start our server
server.listen(1337, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
