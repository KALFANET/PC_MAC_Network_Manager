const { executeCommand } = require("../src/command-handler");

executeCommand("echo 'Test Command Execution'", (err, result) => {
    if (err) {
        console.error("Command Execution Failed:", err);
    } else {
        console.log("Command Output:", result);
    }
});