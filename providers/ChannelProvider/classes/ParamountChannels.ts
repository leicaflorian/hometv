import {BasicChannel} from "./BasicChannel";

class ParamountChannels extends BasicChannel {
  async workflow() {
    return this.preparedUrl()
  }
}

module.exports = ParamountChannels
