const BasicChannel = require('./BasicChannel')

class SportItaliaChannels extends BasicChannel {
  constructor (group) {
    super(group)

    this.axiosSettings = {
      method: 'post'
    }

    return super.routeHandler()
  }

  async redirectTo (data) {
    return data.data.stream
  }
}

module.exports = SportItaliaChannels