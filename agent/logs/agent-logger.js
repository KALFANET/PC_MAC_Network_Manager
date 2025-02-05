const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/agent.log");

function logMessage(message, level = "INFO") {
    const logEntry = `${new Date().toISOString()} [${level}]: ${message}\n`;
    fs.appendFileSync(logFilePath, logEntry, "utf8");
}

function logError(error) {
    logMessage(error.toString(), "ERROR");
}

module.exports = { logMessage, logError };