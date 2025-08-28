// Example of sending a message using the WebSocket Client extension
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Connected to server');
    ws.send(JSON.stringify({ message: 'Hello, Server!' }));
};

ws.onmessage = (event) => {
    console.log('Received:', event.data);   
};

ws.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

ws.onclose = () => {
    console.log('Connection closed');
};