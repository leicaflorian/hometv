import { BasicChannel } from "./BasicChannel";

class MediasetChannels extends BasicChannel {
  async workflow() {
    const url = this.preparedUrl();
    const result = await this.axiosCall({
      url,
      method: "get",
      headers: {
        origin: "https://www.mediasetplay.mediaset.it",
        pragma: "no-cache",
        referer: "https://www.mediasetplay.mediaset.it/",
      },
    });

    const urlList =
      result.data.response.tuningInstruction["urn:theplatform:tv:location:any"];
    const mpegUrl = urlList.find(
      (urlObject) =>
        urlObject.format === "application/x-mpegURL" &&
        urlObject.assetTypes.includes("geoEU")
    );

    console.log(urlList);

    return mpegUrl.publicUrls[0];
    // return result.data.response.publicUrl;
  }
}

module.exports = MediasetChannels;
