declare interface ChannelsIptvList {
  order: number
  row1: string
  row2: string
}

/**
 * @see {@link (https://en.f-player.ru/extm3u-iptv-format)}
 */
declare interface Channel {
  id: string
  code: string
  name: string
  key?: string
  embed?: string
  url: string
  order: number
  groupId: string
  groupTitle: string
  tvgId: string
  tvgShift: string
  tvgName: string
  tvgLogo: string
  radio: string
}

declare interface ChannelGroup {
  baseUrl: string
  groupTitle: string
  channels: Channel[]
}

export {ChannelsIptvList, Channel, ChannelGroup}
