const { executeCommand } = require("./command-handler");

function runSystemUpdate(callback) {
    const command = process.platform === "win32" ? "powershell.exe Get-WindowsUpdate" : "sudo apt update && sudo apt upgrade -y";
    executeCommand(command, callback);
}

function restartAgent(callback) {
    executeCommand("sudo systemctl restart agent-service", callback);
}

module.exports = { runSystemUpdate, restartAgent };