import {BasicChannel} from "./BasicChannel";

class SkyChannels extends BasicChannel {

  async workflow(): Promise<string> {
    /*
    required a proxy

     fastify.register(require('fastify-http-proxy'), {
        upstream: 'https://apid.sky.it',
        prefix: '/sky/proxy', // optional
        rewritePrefix: '/vdp/v1/getLivestream',
        http2: false // optional
    })
     */

    const url = this.preparedUrl()
    try {

      const result = await this.axiosCall({
        url,
        method: "get",
        /*withCredentials: true,
        headers: {
          origin: 'https://www.cielotv.it',
          referer: 'https://www.cielotv.it/',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36'
        }*/
      })

      return result.data
    } catch (er) {
      console.error(er)
      return er
    }
  }
}

module.exports = SkyChannels
