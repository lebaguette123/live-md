import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const server = createServer((request, response) => {
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello, World!\n');
})

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log("Client connected");
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Message received: ${message}`);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  })
})

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
