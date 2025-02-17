const Device = require('../models/device');
const { exec } = require('child_process');

// התקנת תוכנה מרחוק
exports.installSoftware = async (req, res) => {
    try {
        const { deviceId, softwareUrl, os } = req.body;

        if (!deviceId || !softwareUrl || !os) {
            return res.status(400).json({ message: "Missing parameters" });
        }

        const device = await Device.findOne({ where: { id: deviceId } });
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        let installCommand = "";
        if (os === "windows") {
            installCommand = `powershell.exe Start-Process -FilePath "msiexec.exe" -ArgumentList "/i ${softwareUrl} /quiet" -Wait`;
        } else if (os === "macos") {
            installCommand = `hdiutil attach ${softwareUrl} && sudo installer -pkg /Volumes/Software/*.pkg -target /`;
        }

        exec(installCommand, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ message: "Error installing software", error: stderr });
            }
            res.status(200).json({ message: `Installation started on ${os}`, output: stdout });
        });

    } catch (error) {
        res.status(500).json({ message: 'Error processing installation request', error: error.message });
    }
};