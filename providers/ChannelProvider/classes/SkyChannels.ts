import { BasicChannel } from "./BasicChannel";

import dayjs from "dayjs";
import { SocksProxyAgent } from "socks-proxy-agent";
import { AxiosResponse } from "axios";

const italianProxies = [
  "52.144.70.194:4145",
  "83.149.165.27:1088",
  "185.16.132.4:5678",
  "46.141.30.158:5678",
  "95.169.92.3:4145",
  "83.149.165.30:1088",
  "185.208.191.110:1088",
  "82.62.100.76:1080",
  "80.94.118.192:4145",
  "93.48.228.247:4153",
  "217.141.179.178:1088",
  "178.250.70.218:1088",
  "5.83.104.170:4153",
  "154.60.200.61:4153",
  "94.141.4.66:5678",
  "93.63.75.62:1080",
  "213.178.223.54:5678",
  "5.83.104.177:4153",
  "185.87.70.171:4153",
  "5.83.104.147:4153",
  "31.3.170.51:1088",
  "185.142.174.46:3629",
  "2.38.199.61:1080",
  "188.95.20.139:5678",
  "62.94.196.19:1088",
  "185.142.173.167:3629",
  "185.13.221.243:4145",
  "195.22.221.210:4145",
  "109.73.180.188:5678",
  "185.8.25.34:4153",
  "109.73.178.197:5678",
  "109.73.191.200:5678",
  "109.73.191.217:8291",
  "94.100.38.54:1088",
  "37.34.74.186:4145",
];

const workingProxies: Record<string, number> = {};

class SkyChannels extends BasicChannel {
  cache: Record<string, { lastFetch: Date; lastUrl: string }> = {};

  async workflow(): Promise<string> {
    const channel = this.getChannel();

    if (!channel) {
      throw new Error("Unknown channel");
    }

    console.log("datesDiff", dayjs().diff(dayjs(this.cache[channel.id]?.lastFetch), "minutes"));
    
    // if the last fetch is older than 10 min, refetch data
    if (
      this.cache[channel.id] &&
      this.cache[channel.id].lastFetch &&
      this.cache[channel.id].lastUrl &&
      dayjs().diff(dayjs(this.cache[channel.id].lastFetch), "minutes") < 10
    ) {
      return this.cache[channel.id].lastUrl;
    }

    const url = this.preparedUrl();

    try {
      console.log("SKY: Making call to ", url);

      const result = await this.tryProxy(url);
      console.log("SKY: Call responded ", result);

      if (!result || !result.streaming_url) {
        throw new Error("Can't find the requested channel");
      }

      this.cache[channel.id] = {
        lastFetch: new Date(),
        lastUrl: result.streaming_url,
      };

      return result.streaming_url;
    } catch (er) {
      console.log(er);

      throw er;
    }
  }

  async tryProxy(url: string): Promise<any> {
    const list: any[] = [...italianProxies];

    list.sort(() => Math.random() - 0.5);
    list.sort((a) => (workingProxies[a] === undefined) ? 0 : -workingProxies[a])

    for (let proxy of list) {
      // creates a sort of priority list of ips to use, based on their working times
      if (workingProxies[proxy] === undefined) {
        workingProxies[proxy] = 0;
      }

      try {
        const httpsAgent = new SocksProxyAgent("socks4://" + proxy);
        httpsAgent.timeout = 5000 // set timeout to 5 minute per each call

        const client = this.axiosCall.create({ httpsAgent });

        console.log("trying proxy", proxy);

        const result: AxiosResponse<any> = await client.get(url);

        if (typeof result.data !== "string") {
          workingProxies[proxy] += 1;

          return Promise.resolve(result.data);
          break;
        } else {
          workingProxies[proxy] -= 1;
        }
      } catch (er) {
        workingProxies[proxy] -= 1;
      }
    }

    /* return Promise.any(pendingRequests).then((resp) => {
      resp;
    }); */
  }
}

module.exports = SkyChannels;
