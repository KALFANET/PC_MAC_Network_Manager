const WebSocket = require('ws');

class RemoteAccess {
    constructor(serverUrl) {
        this.ws = new WebSocket(serverUrl);
        
        this.ws.on('open', () => console.log("🔗 Connected to remote server"));
        this.ws.on('message', message => console.log("📩 Received:", message));
        this.ws.on('close', () => console.log("⚠️ Connection closed"));
        this.ws.on('error', err => console.error("❌ WebSocket Error:", err));
    }

    sendCommand(deviceId, command) {
        const payload = { deviceId, command };
        this.ws.send(JSON.stringify(payload));
        console.log("📤 Sent Command:", command);
    }
}

module.exports = RemoteAccess;