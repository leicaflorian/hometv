import { BasicChannel } from "./BasicChannel";

class La7Channels extends BasicChannel {
  async workflow(): Promise<string> {
    return this.preparedUrl();
  }
}

module.exports = La7Channels
