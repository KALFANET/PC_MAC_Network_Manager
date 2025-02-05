const AgentCommands = require("./agent-commands");
const NetworkAgent = require("./network-agent");
const Logger = require("../logs/agent-logger");
const Encryption = require("./encryption");

class AgentService {
  constructor() {
    this.commands = new AgentCommands();
    this.network = new NetworkAgent();
    this.logger = new Logger();
    this.encryption = new Encryption();
  }

  async executeCommand(command) {
    this.logger.log(`Executing command: ${command}`);
    return this.commands.run(command);
  }
}

module.exports = AgentService;