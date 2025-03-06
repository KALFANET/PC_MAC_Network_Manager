const { exec } = require("child_process");
const { Device, Log } = require("../models");

exports.installSoftware = async (req, res) => {
    try {
        console.log("📥 Request to install software:", req.body);

        const { idKey, softwareUrl, os } = req.body;

        if (!idKey || !softwareUrl || !os) {
            return res.status(400).json({ message: "Missing parameters: idKey, softwareUrl, and os are required" });
        }

        // 🛡️ ולידציה נוספת על ה-URL כדי למנוע הזרקת פקודות
        const validUrl = /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm.test(softwareUrl);
        if (!validUrl) {
            return res.status(400).json({ message: "Invalid software URL" });
        }

        // 🔍 שליפת המכשיר מהמסד נתונים לפי `idKey`
        const device = await Device.findOne({ where: { idKey } });

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        console.log(`📡 Preparing installation on ${idKey} (${os}) from ${softwareUrl}...`);

        // 🎯 הבטחת תקינות שם מערכת ההפעלה
        const osLower = os.toLowerCase();
        if (osLower !== "macos" && osLower !== "windows") {
            return res.status(400).json({ message: "Unsupported operating system" });
        }

        // 📌 יצירת פקודת התקנה לפי מערכת ההפעלה
        let installCommand;
        if (osLower === "macos") {
            installCommand = `
                curl -o "/tmp/software.pkg" "${softwareUrl}" &&
                sudo installer -pkg "/tmp/software.pkg" -target /
            `;
        } else if (osLower === "windows") {
            installCommand = `
                powershell -Command "Invoke-WebRequest -Uri '${softwareUrl}' -OutFile 'C:\\Temp\\software.msi';
                Start-Process -FilePath 'msiexec.exe' -ArgumentList '/i C:\\Temp\\software.msi /quiet /norestart' -Wait"
            `;
        }

        // 🚀 ביצוע הפקודה
        exec(installCommand, async (error, stdout, stderr) => {
            let status = error ? 'failure' : 'success';

            if (error) {
                console.error(`❌ Software installation failed on device ${idKey}:`, stderr);
                return res.status(500).json({ message: "Error installing software", error: stderr });
            }

            // 📌 שמירת לוג התקנה (אם Log קיים)
            if (Log && typeof Log.create === "function") {
                await Log.create({
                    deviceId: device.id,
                    action: 'Software Installed',
                    details: softwareUrl,
                    status
                });
            }

            console.log(`✅ Software installed successfully on device ${idKey}`);
            res.status(200).json({ message: "Software installed successfully", output: stdout, status });
        });

    } catch (error) {
        console.error("❌ Error processing installation request:", error.message);
        res.status(500).json({ message: 'Error processing installation request', error: error.message });
    }
};