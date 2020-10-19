const BasicChannel = require('./BasicChannel')

class ParamountChannels extends BasicChannel {
  constructor (group) {
    super(group)

    return super.routeHandler()
  }

  async workflow (reply, channelId) {
    const url = this.preparedUrl(channelId)

    return reply.redirect(url)
  }
}

module.exports = ParamountChannels