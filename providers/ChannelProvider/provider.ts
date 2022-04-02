import Config from '@ioc:Adonis/Core/Config'

import {template, sortBy, get, set, camelCase, upperFirst} from "lodash"
import {ChannelsIptvList, Channel} from "../../types/ChannelsList";
import {ChannelsConfig} from "../../types/ChannelsConfig";
import {BasicChannel} from "./classes/BasicChannel";
import axios from "axios"
import Env from '@ioc:Adonis/Core/Env'

class ChannelsHandler {
  private config: ChannelsConfig = Config.get("channels")
  private readonly IptvList: string[] = []
  private readonly ChannelsList: Channel[] = []
  private channelsInstances = {}
  private liveTimer: any

  constructor() {
    const lists = this.initIptvList()

    this.IptvList = lists.iptvList
    this.ChannelsList = lists.channelsList

    this.maintainLive()
  }

  public get iptvList() {
    return this.IptvList.join("\n")
  }

  public get channelsList() {
    return this.ChannelsList
  }

  /**
   * Returns the url at which the channel can be seen
   *
   * @param group
   * @param channel
   */
  public async getChannel(group: string, channel: string) {
    let channelInstance: BasicChannel = get(this.channelsInstances, `${group}`)

    // If there is still no instance for the requested group, instantiates it
    if (!channelInstance) {
      const className = upperFirst(camelCase(group)) + "Channels"
      const classToUse = (await import(`./classes/${className}`)).default
      const groupData = this.config.groups.find(_group => _group.groupTitle.toLowerCase() === group.toLowerCase())
  
      set(this.channelsInstances, `${group}`, new classToUse(groupData))
  
      channelInstance = get(this.channelsInstances, `${group}`)
    }
  
    return await channelInstance.handle(channel)
  }
  
  public getChannelHeaders (group: string) {
    let channelInstance: BasicChannel = get(this.channelsInstances, `${group}`)
    
    return channelInstance.headers
  }
  
  private getLogoUrl (channel) {
    const logo = template(this.config.tvg.logosUrl)
    
    if (channel.tvgLogo.startsWith('http')) {
      return channel.tvgLogo
    }
    
    return logo({ id: channel.tvgLogo })
  }
  
  /**
   * Prepare the iptvList and the channelsList by parsing the configurations.
   *
   * @private
   */
  private initIptvList(): { iptvList: string[], channelsList: Channel[] } {
    const content = ['#EXTM3U']
    const channelsIptvList: ChannelsIptvList[] = []
    let channelsList: Channel[] = []

    for (const group of this.config.groups) {
      const groupId = group.groupTitle.toLowerCase()
      const groupChannels: Channel[] = group.channels

      for (const channel of groupChannels) {
        const logo = this.getLogoUrl(channel)
        const orderId = this.config.tvg.order.indexOf(`${groupId}.${channel.id}`)
        const order = orderId >= 0 ? orderId + 1 : orderId

        channelsList.push({
          ...channel,
          order,
          tvgLogo: logo,
          groupTitle: group.groupTitle,
          url: `${process.env.SITE_URL}/${groupId}/${channel.id}.mpd`
        })

        channelsIptvList.push({
          order: order,
          row1: [
            `#EXTINF:${order}`,
            `tvg-id="${channel.tvgId || channel.id || 'EPG N/A'}"`,
            `tvg-name="${channel.tvgName || channel.name || ''}"`,
            `tvg-shift="${channel.tvgShift || ''}"`,
            `tvg-logo="${logo}"`,
            `radio="${channel.radio || ''}"`,
            `group-title="${group.groupTitle || ''}"`,
            `, ${channel.name}`
          ].join(" "),
          row2: `${process.env.SITE_URL}/${groupId}/${channel.id}`
        })
      }
    }

    content.push(...sortBy(channelsIptvList, 'order').map(_entry => _entry.row1 + '\n' + _entry.row2))
    channelsList = sortBy(channelsList, 'order')

    return {
      iptvList: content,
      channelsList
    }
  }


 maintainLive() {
    if(this.liveTimer) {
      clearTimeout(this.liveTimer)
    }

    this.liveTimer = setTimeout(async () => {
        try {
          await axios.get(Env.get('SITE_URL'))
        }catch(er) {}
    }, (100 * 60 * 25))

  }
}

export {ChannelsHandler}
