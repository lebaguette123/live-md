import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', ()=>{
    ws.send("Hello from client!");
});
ws.on('message', (message) => {
    console.log(`Received message from server: ${message}`);
});