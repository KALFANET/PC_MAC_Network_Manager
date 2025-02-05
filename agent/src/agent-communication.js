const WebSocket = require('ws');

class AgentCommunication {
    constructor(serverUrl) {
        this.ws = new WebSocket(serverUrl);
        
        this.ws.on('open', () => console.log("✅ Connected to server"));
        this.ws.on('message', message => this.handleMessage(JSON.parse(message)));
        this.ws.on('close', () => console.log("🔴 Disconnected from server"));
        this.ws.on('error', err => console.error("❌ WebSocket Error:", err));
    }

    handleMessage(message) {
        console.log("📨 Received Command:", message);
        if (message.type === 'command') {
            this.executeCommand(message.command);
        }
    }

    executeCommand(command) {
        console.log("⚙️ Executing:", command);
        // כאן יתבצעו הפקודות המתאימות בהתאם לבקשת השרת
    }

    sendStatusUpdate(status) {
        const payload = { type: 'status', data: status };
        this.ws.send(JSON.stringify(payload));
    }
}

module.exports = AgentCommunication;