const os = require('os');
const { exec } = require('child_process');

class DeviceManager {
    static getDeviceInfo() {
        return {
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            cpuCores: os.cpus().length,
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            networkInterfaces: os.networkInterfaces(),
        };
    }

    static getSystemUptime() {
        return os.uptime();
    }

    static executeCommand(command, callback) {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                callback(`❌ Error: ${stderr}`);
            } else {
                callback(stdout);
            }
        });
    }
}

module.exports = DeviceManager;