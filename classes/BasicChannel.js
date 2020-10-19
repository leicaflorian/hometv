const axios = require('axios').default

const { template } = require('lodash')

class BasicChannel {
  constructor (group) {
    this.group = group
    this.channels = this.group.channels

    this.axiosSettings = {
      method: 'get'
    }
  }

  routeHandler () {
    return async (request, reply) => {
      const channelId = request.params.channel

      try {
        await this.workflow(reply, channelId)
      } catch (er) {
        console.error(er)
        throw er
      }
    }
  }

  preparedUrl (channelId) {
    const channel = this.channels.find(_channel => _channel.id === channelId)
    const urlTmpl = template(this.group.baseUrl)

    return urlTmpl({
      code: channel.code
    })
  }

  async workflow (reply, channelId) {
    try {
      const playlist = await this.getPlaylist(channelId)
      const redirectUrl = await this.redirectTo(playlist)

      reply.redirect(redirectUrl)
    } catch (er) {
      const headers = er.request ? er.request.getHeaders() : ''

      console.error(er, headers)
    }
  }

  async getPlaylist (channelId) {
    const url = this.preparedUrl(channelId)

    console.log('- getting playlist...', url)

    const result = await axios({
      url,
      ...this.axiosSettings
    })

    console.log('- got playlist with', result.request.getHeaders())

    return result.data
  }

  async redirectTo (data) {
    return
  }
}

module.exports = BasicChannel