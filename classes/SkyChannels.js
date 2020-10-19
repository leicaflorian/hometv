const BasicChannel = require('./BasicChannel')

class SkyChannels extends BasicChannel {
  constructor (group) {
    super(group)

    this.axiosSettings = Object.assign({}, this.axiosSettings, {
      withCredentials: true,
      headers: {
        origin: 'https://www.cielotv.it',
        referer: 'https://www.cielotv.it/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36'
      }
    })

    return super.routeHandler()
  }

  async redirectTo (data) {

    console.log('\n\nSKY')
    console.log(data)

    return data.streaming_url
  }
}

module.exports = SkyChannels