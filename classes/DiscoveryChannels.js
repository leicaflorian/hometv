const BasicChannel = require('./BasicChannel')

class DiscoveryChannels extends BasicChannel {
  constructor (group) {
    super(group)

    this.axiosSettings = {
      withCredentials: true,
      headers: {
        referer: 'https://it.dplay.com/nove/',
        'X-Requested-With': 'XMLHttpRequest',
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
        // 'Sec-Fetch-Site': 'same-origin',
        // 'Sec-Fetch-Mode': 'cors'
      }
    }

    return super.routeHandler()
  }

  async redirectTo (data) {
    const jsonData = JSON.parse(data)

    return jsonData.data.attributes.streaming.hls.url
  }
}

module.exports = DiscoveryChannels