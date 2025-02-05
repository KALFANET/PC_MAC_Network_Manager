const os = require('os');
const fs = require('fs');

function getSystemInfo() {
    return {
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        cpu: os.cpus(),
        memory: {
            total: os.totalmem(),
            free: os.freemem()
        },
        network: os.networkInterfaces(),
        uptime: os.uptime()
    };
}

function saveSystemInfoToFile() {
    const info = getSystemInfo();
    fs.writeFileSync('./agent/logs/system-info.json', JSON.stringify(info, null, 2));
}

module.exports = { getSystemInfo, saveSystemInfoToFile };
