import { BasicChannel } from "./BasicChannel";

import dayjs from "dayjs";
import { SocksProxyAgent } from "socks-proxy-agent";
import { HttpsProxyAgent } from "https-proxy-agent";

const italianProxies = [
  {
    ip: "212.43.123.18",
    port: "41258",
  },
  {
    ip: "94.177.207.31",
    port: "80",
  },
  {
    ip: "156.54.212.62",
    port: "3128",
  },
  {
    ip: "02.32.128.70",
    port: "3128",
  },
  {
    ip: "195.250.254.18	",
    port: "8080",
  },
  {
    ip: "2.32.128.70",
    port: "3128",
  },
  {
    ip: "31.199.12.150",
    port: "80",
  },
  {
    ip: "95.210.251.29",
    port: "53281",
  },
];
const httpsAgent = new SocksProxyAgent(
  `socks5://${"it.socks.nordhold.net"}:${1080}`
);

class SkyChannels extends BasicChannel {
  cache: Record<string, { lastFetch: Date; lastUrl: string }> = {};

  async workflow(): Promise<string> {
    const channel = this.getChannel();

    if (!channel) {
      throw new Error("Unknown channel");
    }

    // if the last fetch is older than 10 min, refetch data
    if (
      this.cache[channel.id] &&
      this.cache[channel.id].lastFetch &&
      this.cache[channel.id].lastUrl &&
      dayjs(this.cache[channel.id].lastFetch).diff(dayjs(), "minutes") < 10
    ) {
      return this.cache[channel.id].lastUrl;
    }

    const url = this.preparedUrl();

    try {
      console.log("SKY: Making call to ", url);

      const result = await this.axiosCall({
        url: "http://bachecaonline.altervista.org/proxy.php",
        method: "get",
        timeout: 55000,
        params: {
          u: url,
        }
      });

      console.log("SKY: Call responded ", result.data);

      if (!result.data.streaming_url) {
        throw new Error("Can't find the requested channel");
      }

      this.cache[channel.id] = {
        lastFetch: new Date(),
        lastUrl: result.data.streaming_url,
      };

      return result.data.streaming_url;
    } catch (er) {
      console.log(er);

      throw er;
    }
  }
}

module.exports = SkyChannels;
