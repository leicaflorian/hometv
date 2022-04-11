import { BasicChannel } from './BasicChannel'
import axios from 'axios'
import { parseString } from 'xml2js'

async function parseXml (xml: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

class MediasetChannels extends BasicChannel {
  async workflow () {
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
  
    const mpegUrl = result.data.response.publicUrl
  
    if (this.getChannel()?.useGenericUrl) {
      return mpegUrl;
    }
  
    let finalUrl = `https://live3.msf.cdn.mediaset.net/content/dash_d0_clr_vos/live/channel(${this.channel})/manifest.mpd`
    // let finalUrl = `https://live3t.msf.cdn.mediaset.net/content/dash_d0_cls_vos/live/channel(c5)/manifest.mpd?`
  
    try {
      const xml = await axios.get(mpegUrl, {
        params: {
          format: 'SMIL',
          formats: this.getChannel()?.mpd ? 'MPEG-DASH' : 'M3U',
          // assetTypes: 'HD,browser,widevine,geoIT|geoNo:HD,browser,geoIT|geoNo:HD,geoIT|geoNo:SD,browser,widevine,geoIT|geoNo:SD,browser,geoIT|geoNo:SD,geoIT|geoNo',
          balance: true,
          auto: true,
          tracking: true,
          delivery: 'Streaming'
        }
      })
      
      const smil = await parseXml(xml.data)
      
      finalUrl = smil['smil']['body'][0]['seq'][0]['switch'][0]['video'][0]['$']['src']
        .replace('live3t', 'live3')
        // .replace("manifest.mpd", "manifest_hd.mpd")
        .replace('manifest_sd.mpd', 'manifest.mpd')
    } catch (er) {
      console.log(er)
    }
    
    console.log(finalUrl)
    
    // const mpegUrl = `https://live3.msf.cdn.mediaset.net/content/dash_d0_clr_vos/live/channel(${this.channel})/manifest.mpd`
    return finalUrl
  }
}

module.exports = MediasetChannels;
