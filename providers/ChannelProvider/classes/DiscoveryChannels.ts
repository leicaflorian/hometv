import { AxiosResponse } from "axios";
import { BasicChannel } from "./BasicChannel";
/*

interface DiscoveryResp {
  attributes: {
    protection: {
      clearkeyEnabled: boolean;
      drmEnabled: boolean;
      drmToken: string;
      schemes: {
        fairplay: {
          certificateUrl: string;
          licenseUrl: string;
        };
        playready: {
          licenseUrl: string;
        };
        widevine: {
          licenseUrl: string;
        };
      };
    };
    reportProgressInterval: number;
    streaming: {
      dash: {
        url: string;
      };
      hls: {
        url: string;
      };
      mss: {
        url: string;
      };
    };
    userInfo: {
      packages: string[];
    };
  };
  id: string;
  type: string;
}
*/

interface TokenResponse {
  data: {
    attributes: {
      realm: string;
      token: string;
    };
    id: string;
    type: string;
  };
}
/*

interface VideoInfoResponse {
  data: {
    attributes: {
      markers: {};
      protection: {};
      reportProgressInterval: number;
      sourceSystemId: string;
      streaming: {
        dash: {
          url: string;
        };
        hls: {
          url: string;
        };
      };
      userInfo: {};
      viewingHistory: {};
    };
    id: string;
    type: "videoPlaybackInfo";
  };
}
*/

class DiscoveryChannels extends BasicChannel {
  async fetchToken () {
    const result: AxiosResponse<TokenResponse> = await this.axiosCall.get(
      'https://disco-api.discoveryplus.it/token?realm=dplayit'
    )
    
    return result.data.data.attributes.token
  }
  
  
  /* async workflow(): Promise<string> {
    const token = await this.fetchToken();
    const url = this.preparedUrl();

    try {
      const resp:AxiosResponse<VideoInfoResponse> = await this.axiosCall.get(url, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return resp.data.data.attributes.streaming.hls.url
    } catch (er) {
      console.log(er);

      return "";
    }
  } */

  async workflow(): Promise<string> {
    // First call "https://eu1-prod.disco-api.com/token?realm=dplay" and get data.attribute.token
    
    // then call " https://eu1-prod.disco-api.com/playback/channelPlaybackInfo/323?usePreAuth=true" and get data.attributes.streaming.dash.url
    // da qui, leggere anche data.attributes.protection.drmToken che sarà il codice per la licenza
    
    // TODO:: capire funzionamento licenza. Capire come passarla al client visto che il lavoro viene fatto dal server
    // Forse aggiungere un endpoint per la licenza in base al canale?
    // Serve controlalre https://reference.dashif.org/dash.js/latest/samples/drm/widevine.html
    // su come collegarsi al server usando una licenza
    
    return this.preparedUrl()
  }
}

module.exports = DiscoveryChannels;
