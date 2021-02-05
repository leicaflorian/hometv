import {BasicChannel} from "./BasicChannel";

class MediasetChannels extends BasicChannel {
  async workflow() {
    const url = this.preparedUrl()
    const result = await this.axiosCall({
      url,
      method: "get"
    })

    const urlList = result.data.response.tuningInstruction['urn:theplatform:tv:location:any']
    const mpegUrl = urlList.find(urlObject => urlObject.format === 'application/x-mpegURL')

    return mpegUrl.publicUrls[0]
  }
}

module.exports = MediasetChannels
