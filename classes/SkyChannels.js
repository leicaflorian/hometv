const BasicChannel = require('./BasicChannel')

class SkyChannels extends BasicChannel {
  constructor (group) {
    super(group)

    return super.routeHandler()
  }

  async redirectTo (data) {
    return data.streaming_url
  }
}

module.exports = SkyChannels