import { BasicChannel } from './BasicChannel'

class TestChannels extends BasicChannel {
  public headers = {
    'Content-Type': 'application/dash+xml',
  }
  async workflow (): Promise<string> {
    return this.preparedUrl()
  }
}

module.exports = TestChannels
