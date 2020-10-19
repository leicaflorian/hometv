const BasicChannel = require('./BasicChannel')

class MediasetChannels extends BasicChannel {
  constructor (group) {
    super(group)

    return super.routeHandler()
  }

  async redirectTo (data) {
    const urlList = data.response.tuningInstruction['urn:theplatform:tv:location:any']

    const mpegUrl = urlList.find(urlObject => urlObject.format === 'application/x-mpegURL')

    return mpegUrl.publicUrls[0]
  }
}

module.exports = MediasetChannels