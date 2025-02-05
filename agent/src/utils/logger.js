const fs = require('fs');
const path = require('path');

class Logger {
    static logFile = path.join(__dirname, '../../logs/agent-logs.txt');

    static writeLog(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;

        fs.appendFile(this.logFile, logMessage, (err) => {
            if (err) console.error("❌ Log Write Error:", err);
        });
    }

    static logEvent(event) {
        console.log(event);
        this.writeLog(event);
    }
}

module.exports = Logger;