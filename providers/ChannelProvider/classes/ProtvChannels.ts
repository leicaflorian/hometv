import * as jsdom from "jsdom"
import {BasicChannel} from "./BasicChannel";

class ProtvChannels extends BasicChannel {
  async workflow(): Promise<string> {
    const {JSDOM} = jsdom;
    const channel = this.getChannel()
    let result = ""

    try {


      const dom = await JSDOM.fromURL(channel?.embed)
      const document = dom.window.document

      for (const script of document.scripts) {
        if (script.text.includes("Player.init")) {
          const match = script.textContent.match(/(src).*(m3u8)/)[0]

          result = match.replace(/src.*"/, "")
        }
      }

      return result.replace(/\\/g, "")
    } catch (er) {
      return ""
    }

  }
}

module.exports = ProtvChannels
