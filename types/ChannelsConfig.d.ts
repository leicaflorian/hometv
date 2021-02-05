import { ChannelGroup} from "./ChannelsList";

declare interface ChannelsConfig {
  tvg: {
    logosUrl: string
    order: string[]
  },
  groups: ChannelGroup[]
}

export {ChannelsConfig}
