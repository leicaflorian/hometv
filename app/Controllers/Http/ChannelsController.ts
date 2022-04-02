import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {ApplicationContract} from "@ioc:Adonis/Core/Application";
// import type {ChannelsHandler} from "../../../providers/ChannelProvider/provider";
/**
 * @type {import(../../../providers/ChannelProvider/provider)}
 */
import ChannelsHandler from "@ioc:Channels";

export default class ChannelsController {
  constructor(protected app: ApplicationContract) {
  }

  async getIptvList({request, response}: HttpContextContract) {
    const stream = ChannelsHandler.iptvList
    const returnText = request.get()["only_text"]
    const returnJson = request.get()["only_json"]

    if (returnJson){
      response.header('Content-Type', 'application/json')
      return ChannelsHandler.channelsList
    }

    if (!returnText) {
      response.header('Content-Type', 'application/x-mpegURL')
    }
    response.send(stream)
  }

  async getChannel({params, response}: HttpContextContract) {
    const group = params.group
    const channel = params.channel.replace(".mpd", "")
  
    const url = await ChannelsHandler.getChannel(group, channel)
    const headers = ChannelsHandler.getChannelHeaders(group)
  
    if (headers) {
      Object.keys(headers).forEach((headerKey) => {
        response.header(headerKey, headers[headerKey])
      })
    }
  
    // response.header('Content-Type', 'application/x-mpegURL')
    response.redirect(url)
  }
}
