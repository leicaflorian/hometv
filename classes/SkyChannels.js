const BasicChannel = require('./BasicChannel')

class SkyChannels extends BasicChannel {
  constructor (group) {
    super(group)

    this.axiosSettings = {
      withCredentials: true,
      headers: {
        origin: 'https://www.cielotv.it',
        referer: 'https://www.cielotv.it/'
      }
    }

    return super.routeHandler()
  }

  async redirectTo (data) {

    console.log('\n\nSKY')
    console.log(data)

    return data.streaming_url
  }
}

module.exports = SkyChannels