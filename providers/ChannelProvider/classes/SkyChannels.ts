import {BasicChannel} from "./BasicChannel";
import HttpException from "@adonisjs/http-server/build/src/Exceptions/HttpException.js"

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
      console.log("SKY: Making call to ", url);

      const result = await this.axiosCall({
        url,
        method: "get",
        timeout: 15000
      });

      console.log("SKY: Call responded ", result.data.streaming_url);

      if (!result.data.streaming_url) {
        throw new Error("Can't find the requested channel")
      }

      return result.data.streaming_url 
    } catch (er) {
      console.error(er)
      throw er
    }
  }
}

module.exports = SkyChannels
