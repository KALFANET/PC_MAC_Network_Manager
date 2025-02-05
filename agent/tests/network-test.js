const dns = require('dns');

dns.resolve('www.google.com', (err) => {
    if (err) {
        console.error("❌ No internet connection detected.");
    } else {
        console.log("✅ Network is operational.");
    }
});