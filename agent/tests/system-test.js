const assert = require("assert");
const SystemInfo = require("../src/system-info");

describe("System Info Tests", function () {
  it("should retrieve system information", async function () {
    const info = await SystemInfo.getSystemDetails();
    assert(info.cpu && info.memory, "System info is incomplete!");
  });
});