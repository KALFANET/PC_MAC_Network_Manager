const os = require('os');
const { exec } = require('child_process');

function checkInternetConnection(callback) {
    exec('ping -c 1 google.com', (error, stdout, stderr) => {
        if (error) {
            return callback(false);
        }
        return callback(true);
    });
}

function checkServiceStatus() {
    return {
        hostname: os.hostname(),
        uptime: os.uptime(),
        memoryUsage: os.freemem() / os.totalmem(),
        internetConnected: null
    };
}

module.exports = { checkInternetConnection, checkServiceStatus };