import { BasicChannel } from "./BasicChannel";

class MediasetChannels extends BasicChannel {
  async workflow() {
    const channel = this.getChannel();
  
    if (channel?.id === "20") {
      return "http://ultimateiptv.me:8080/nojomtv.com/R9cgHozQpq/265011390"
    }
  
    const url = this.preparedUrl()
    const result = await this.axiosCall({
      url,
      method: 'get',
      headers: {
        origin: 'https://www.mediasetplay.mediaset.it',
        pragma: 'no-cache',
        referer: 'https://www.mediasetplay.mediaset.it/'
      }
    })
    // console.log(url)
    // console.log(result.data.response)
    // const urlList = result.data.response.tuningInstruction['urn:theplatform:tv:location:any']
    const mpegUrl = result.data.response.publicUrl
    // const mpegUrl = urlList.find(
    //   (urlObject) =>
    //     urlObject.format === 'application/x-mpegURL' &&
    //     urlObject.assetTypes.includes('geoEU')
    // )
  
    // console.log(urlList)
  
    return mpegUrl
    // return mpegUrl.publicUrls[0]
    // return result.data.response.publicUrl;
  }
}

module.exports = MediasetChannels;
