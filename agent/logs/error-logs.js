const fs = require('fs');
const path = require('path');

class ErrorLogger {
    static errorLogFile = path.join(__dirname, 'error-logs.txt');

    static logError(error) {
        const timestamp = new Date().toISOString();
        const errorMessage = `[${timestamp}] ERROR: ${error}\n`;

        fs.appendFile(this.errorLogFile, errorMessage, (err) => {
            if (err) console.error("❌ Error Write Failure:", err);
        });

        console.error("🚨 Critical Error:", error);
    }
}

module.exports = ErrorLogger;