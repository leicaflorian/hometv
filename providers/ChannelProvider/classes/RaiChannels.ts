import {BasicChannel} from "./BasicChannel";

class RaiChannels extends BasicChannel {
  async workflow(): Promise<string> {
    return this.preparedUrl()
  }
}

export default RaiChannels
