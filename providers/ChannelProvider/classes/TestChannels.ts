import { BasicChannel } from './BasicChannel'

class TestChannels extends BasicChannel {
  async workflow (): Promise<string> {
    return this.preparedUrl()
  }
}

module.exports = TestChannels
