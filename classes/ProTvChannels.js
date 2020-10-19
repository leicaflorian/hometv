const BasicChannel = require('./BasicChannel')

class ProTvChannels extends BasicChannel {
  constructor (group) {
    super(group)

    return super.routeHandler()
  }

  async workflow (reply, channelId) {
    const url = this.preparedUrl(channelId)

    return reply.redirect(url)
  }
}

module.exports = ProTvChannels