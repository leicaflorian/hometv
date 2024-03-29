import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import { AxiosResponse } from 'axios'
import { Channel } from 'types/ChannelsList'
import { getRandomProxy } from '../ItalianProxies';
import { BasicChannel } from './BasicChannel'

const parseString = require('xml2js').parseStringPromise

// import { final } from 'pino'

interface RaiJSON {
  id: string; // "ContentItem-983d0874-1718-4e58-952a-1615517c8e83",
  type: string; // "RaiPlay Diretta Item",
  date_published: string; // "17-05-2010",
  time_published: string; //  "17:02",
  channel: string; // "Rai Sport",
  description: string; // "Rai Sport, Diretta Live streaming su RaiPlay",
  editor: string; // "Rai Sport",
  hex_color: string; // "#FF510C",
  multicast_url: string; // "udp://@239.1.1.8:1234",
  name: string; // "Diretta di RaiSport",
  weblink: string; // "/dirette/raisport",
  path_id: string; // "/dirette/raisport.json",
  rights_management: any; // {},
  still_frame: string; // "/lfe_apple/Raisport2.png",
  transparent_icon: string; // "/dl/img/2020/01/24/1579883330343_rai-sport.svg",
  header_bg: string; // "/dl/img/2019/10/24/1571899542634_rai-sport3x.png",
  is_live: boolean; // true,
  uhd: boolean; // false,
  ignore_whitelist: boolean; // false,
  dfp: any; // {},
  adv: boolean; // true,
  video: {
    content_url: string; // "https://mediapolis.rai.it/relinker/relinkerServlet.htm?cont=358071";
    highlights: string; // "";
  };
  track_info: any; // {},
  nobanner: boolean; // false;
  noroll: boolean; // false;
  nofloorad: boolean; // false;
}

class RaiChannels extends BasicChannel {
  async workflow(): Promise<string> {
    const channel: Channel = this.getChannel() as Channel

    try {
      // Find the link directly from the api of RAI
      const result: AxiosResponse<RaiJSON> = await this.axiosCall({
        url: this.preparedUrl(channel.id.toLowerCase()),
        method: 'get'
      })

      console.log("Link to the channel", result.data.video.content_url);

      try {
        // facendo la chiamata lato server, essendo questo fuori dall'italia, mi da errore
        const resp = await this.axiosCall(result.data.video.content_url, {
          params: {
            output: '7'
            // output: '54'
            // output: '7'
          },
          proxy: getRandomProxy()
        })

        console.log(resp.data);

        const xmlData = await parseString(resp.data)

        return xmlData.Mediapolis.url[0]._.trim()
      } catch (er) {
        console.error(er)
      }

      return result.data.video.content_url

      // return result.data.video.content_url
    } catch (er) {
      console.error(er)
      return er
    }
  }
}

export default RaiChannels
