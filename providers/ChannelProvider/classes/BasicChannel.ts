import axios, {AxiosRequestConfig} from "axios"
import {template} from 'lodash'
import {Channel, ChannelGroup} from "../../../types/ChannelsList";

abstract class BasicChannel {
  protected readonly axiosSettings: AxiosRequestConfig
  protected channel: string
  protected axiosCall = axios

  constructor(private groupData: ChannelGroup) {


  }

  /**
   * Handles the channel request
   *
   * @param channel
   */
  public async handle(channel) {
    this.channel = channel

    try {
      return this.workflow()
    } catch (er) {
      console.error(er)

      throw er
    }
  }

  /**
   * Prepares the final url for the channel
   *
   * @private
   */
  protected preparedUrl(): string {
    const channel = this.groupData.channels.find(_channel => _channel.id === this.channel)
    const urlTmpl = template(this.groupData.baseUrl)

    if (!channel) {
      throw new Error("Channel not found: " + this.channel)
    }

    return urlTmpl({
      code: channel.code
    })
  }

  protected getChannel(): Channel | null {
    const result = this.groupData.channels.find(_channel => _channel.id === this.channel)

    return result || null
  }

  /**
   * Workflow that will be processed to be able to get the channel working.
   */
  abstract workflow(): Promise<string>
}

export {BasicChannel}
