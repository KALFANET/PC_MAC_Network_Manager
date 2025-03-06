const { exec } = require("child_process");
const util = require("util");
const os = require("os");
const execPromise = util.promisify(exec);
const { NetworkConfig } = require("../models");

// 📌 קביעת הפקודות לפי מערכת ההפעלה
const commands = {
    getAvailableNetworks: {
        darwin: "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s",
        linux: "nmcli -t -f SSID dev wifi list",
        win32: "netsh wlan show networks mode=bssid"
    },

    getNetworkType: {
        darwin: "route get default | grep interface | awk '{print $2}'",
        linux: "nmcli -t -f TYPE,STATE dev",
        win32: "powershell -Command \"(Get-NetAdapter | Where-Object {$_.Status -eq 'Up'}).InterfaceDescription\""
    },

    getNetworkStatus: {
        darwin: "route get default | grep interface | awk '{print $2}'",
        linux: "nmcli -t -f TYPE,STATE dev",
        win32: "powershell -Command \"(Get-NetAdapter | Where-Object {$_.Status -eq 'Up'}).Status\""
    },

    connectToNetwork: (ssid, password) => ({
        darwin: `networksetup -setairportnetwork en0 "${ssid}" "${password}"`,
        linux: `nmcli dev wifi connect "${ssid}" password "${password}"`,
        win32: `netsh wlan connect name="${ssid}"`
    }),

    disconnectNetwork: {
        darwin: "networksetup -setairportpower en0 off",
        linux: "nmcli networking off",
        win32: "netsh wlan disconnect"
    }
};

// 📌 זיהוי מערכת ההפעלה
const platform = os.platform();

// ✅ שליפת רשימת הרשתות הזמינות
exports.getAvailableNetworks = async (req, res) => {
    try {
        const command = commands.getAvailableNetworks[platform];
        if (!command) throw new Error("Unsupported OS");

        const { stdout } = await execPromise(command);

        let networks = [];
        if (platform === "darwin") {
            networks = stdout.split("\n")
                .slice(1)
                .map(line => line.trim().split(/\s{2,}/)[0])
                .filter(ssid => ssid && !ssid.includes("BSSID"));
        } else if (platform === "win32") {
            networks = stdout.match(/SSID \d+ : (.+)/g)?.map(match => match.split(": ")[1]) || [];
        } else {
            networks = stdout.split("\n").map(line => line.trim()).filter(Boolean);
        }

        res.json({ success: true, networks });
    } catch (error) {
        console.error("❌ Error fetching available networks:", error.message);
        res.status(500).json({ success: false, message: "Error fetching networks" });
    }
};

// ✅ בדיקת סוג חיבור (Wi-Fi או Ethernet)
exports.getNetworkType = async (req, res) => {
    try {
        const command = commands.getNetworkType[platform];
        if (!command) throw new Error("Unsupported OS");

        const { stdout } = await execPromise(command);

        let type = "Unknown";
        if (platform === "darwin") {
            type = stdout.trim() === "en0" ? "Wi-Fi" : "Ethernet";
        } else if (platform === "win32") {
            type = stdout.includes("Wi-Fi") ? "Wi-Fi" : "Ethernet";
        } else {
            stdout.split("\n").forEach(line => {
                const [connType, state] = line.split(":");
                if (state === "connected") {
                    type = connType === "ethernet" ? "Ethernet" : "Wi-Fi";
                }
            });
        }

        res.json({ success: true, type });
    } catch (error) {
        console.error("❌ Error fetching network type:", error.message);
        res.status(500).json({ success: false, message: "Error fetching network type" });
    }
};

// ✅ בדיקת סטטוס חיבור לרשת
exports.getNetworkStatus = async (req, res) => {
    try {
        const command = commands.getNetworkStatus[platform];
        if (!command) throw new Error("Unsupported OS");

        const { stdout } = await execPromise(command);

        let status = "Disconnected";
        if (platform === "darwin") {
            status = stdout.trim() === "en0" ? "Wi-Fi מחובר" : "Ethernet מחובר";
        } else if (platform === "win32") {
            status = stdout.includes("Up") ? "מחובר" : "מנותק";
        } else {
            stdout.split("\n").forEach(line => {
                const [type, state] = line.split(":");
                if (state === "connected") {
                    status = type === "ethernet" ? "Ethernet מחובר" : "Wi-Fi מחובר";
                }
            });
        }

        res.json({ success: true, status });
    } catch (error) {
        console.error("❌ Error fetching network status:", error.message);
        res.status(500).json({ success: false, message: "Error fetching network status" });
    }
};

// ✅ חיבור לרשת Wi-Fi ושמירה במסד נתונים
exports.setNetworkConfig = async (req, res) => {
    try {
        const { ssid, password } = req.body;
        if (!ssid) return res.status(400).json({ success: false, message: "SSID is required" });

        const existingNetwork = await NetworkConfig.findOne({ where: { ssid } });
        if (existingNetwork) {
            await existingNetwork.update({ password, isActive: true });
        } else {
            await NetworkConfig.create({ ssid, password });
        }

        const command = commands.connectToNetwork(ssid, password)[platform];
        if (!command) throw new Error("Unsupported OS");

        const { stdout } = await execPromise(command);
        res.json({ success: true, message: `Connected to ${ssid}`, output: stdout.trim() });
    } catch (error) {
        console.error("❌ Error setting network:", error.message);
        res.status(500).json({ success: false, message: "Error setting network" });
    }
};

// ✅ ניתוק מהרשת ועדכון במסד נתונים
exports.disconnectNetwork = async (req, res) => {
    try {
        const command = commands.disconnectNetwork[platform];
        if (!command) throw new Error("Unsupported OS");

        const { stdout } = await execPromise(command);
        await NetworkConfig.update({ isActive: false }, { where: { isActive: true } });

        res.json({ success: true, message: "Network disconnected successfully", output: stdout.trim() });
    } catch (error) {
        console.error("❌ Error disconnecting network:", error.message);
        res.status(500).json({ success: false, message: "Error disconnecting network" });
    }
};