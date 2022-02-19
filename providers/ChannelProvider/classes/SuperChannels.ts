import { BasicChannel } from "./BasicChannel";

class SuperChannels extends BasicChannel {
  async workflow(): Promise<string> {
    return this.preparedUrl();
  }
}

module.exports = SuperChannels
