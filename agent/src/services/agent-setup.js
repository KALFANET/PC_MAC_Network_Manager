const fs = require('fs');
const { exec } = require('child_process');

function installDependencies() {
    console.log("Installing dependencies...");
    exec('npm install', (err, stdout, stderr) => {
        if (err) {
            console.error("Failed to install dependencies:", err);
        } else {
            console.log("Dependencies installed successfully.");
        }
    });
}

function createLogFile() {
    if (!fs.existsSync('./agent/logs/agent.log')) {
        fs.writeFileSync('./agent/logs/agent.log', '');
        console.log("Log file created.");
    }
}

installDependencies();
createLogFile();
console.log("Agent setup completed!");