import {BasicChannel} from "./BasicChannel";

class ProtvChannels extends BasicChannel {
  async workflow(): Promise<string> {
    return this.preparedUrl()
  }
}

module.exports = ProtvChannels
