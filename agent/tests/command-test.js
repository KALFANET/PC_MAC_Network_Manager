const { rebootSystem, listProcesses, getNetworkConfig } = require('../src/services/agent-commands');

rebootSystem((err, result) => {
    if (err) {
        console.error("Reboot failed:", err);
    } else {
        console.log("Reboot initiated:", result);
    }
});

listProcesses((err, result) => {
    if (err) {
        console.error("Failed to list processes:", err);
    } else {
        console.log("Processes:", result);
    }
});

getNetworkConfig((err, result) => {
    if (err) {
        console.error("Failed to get network config:", err);
    } else {
        console.log("Network Config:", result);
    }
});