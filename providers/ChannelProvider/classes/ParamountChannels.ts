import { Channel } from "types/ChannelsList";
import { BasicChannel } from "./BasicChannel";

class ParamountChannels extends BasicChannel {
  async workflow() {
    const channel: Channel = this.getChannel() as Channel;

    if (channel.id === "vh1") {
      return "https://content.uplynk.com/channel/36953f5b6546464590d2fcd954bc89cf.m3u8";
    }

    return this.preparedUrl();
  }
}

module.exports = ParamountChannels;
