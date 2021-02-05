import {BasicChannel} from "./BasicChannel";

interface DiscoveryResp {
  "attributes": {
    "protection": {
      "clearkeyEnabled": boolean,
      "drmEnabled": boolean,
      "drmToken": string,
      "schemes": {
        "fairplay": {
          "certificateUrl": string
          "licenseUrl": string
        },
        "playready": {
          "licenseUrl": string
        },
        "widevine": {
          "licenseUrl": string
        }
      }
    },
    "reportProgressInterval": number,
    "streaming": {
      "dash": {
        "url": string
      },
      "hls": {
        "url": string
      },
      "mss": {
        "url": string
      }
    },
    "userInfo": {
      "packages": string[]
    }
  },
  "id": string,
  "type": string
}

class DiscoveryChannels extends BasicChannel {
  async getToken(axiosInstance) {
    // const url = "https://disco-api.discoveryplus.it/token?realm=dplayit&deviceId=b0146bb46ac9bd694c68ec8ca620291652551a4087fc68dee776189ea54d0d54&shortlived=true"

    return axiosInstance.get("/token?realm=dplayit&deviceId=b0146bb46ac9bd694c68ec8ca620291652551a4087fc68dee776189ea54d0d54&shortlived=true")
  }

  async workflow(): Promise<string> {
    const axiosInstance = this.axiosCall.create({
      baseURL: 'https://disco-api.discoveryplus.it/',
      timeout: 1000,
      withCredentials: true,
      headers: {
        "x-disco-client": "WEB:UNKNOWN:discoveryplus-player:7e5848f01",
        Connection: "keep-alive",
        // Host: "eurosport-dlvr-ott.akamaized.net",
        Origin: "https://www.discoveryplus.it",
        Pragma: "no-cache",
        Referer: "https://www.discoveryplus.it/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      }
    });

    const token = await this.getToken(axiosInstance)
    const cookies = token.headers["set-cookie"]

    const url = this.preparedUrl()

    try {
      const result = await axiosInstance.get(url, {
        headers: {
          Cookie: cookies,
        }
      })

      const resp: DiscoveryResp = result.data.data

      // const content = await axiosInstance.get(resp.attributes.streaming.hls.url)

      return resp.attributes.streaming.hls.url
    } catch (er) {
      console.log(er)
    }
  }
}

module.exports = DiscoveryChannels
