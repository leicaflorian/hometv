import * as jsdom from "jsdom";
import { BasicChannel } from "./BasicChannel";
import { CookieJar } from "tough-cookie";
import qs from "qs";
import * as tough from "tough-cookie";

import axiosCookieJarSupport from "axios-cookiejar-support";

class AntenaChannels extends BasicChannel {
  private JSDOM = jsdom.JSDOM;
  //private loginSession = null

  async login() {
    const loginUrl = "https://antenaplay.ro/intra-in-cont";

    axiosCookieJarSupport(this.axiosCall);

    let cookieJar: CookieJar = new tough.CookieJar();
    const dom = await this.JSDOM.fromURL(loginUrl, {
      pretendToBeVisual: true,
      cookieJar: cookieJar,
      //runScripts: "dangerously",
    });
    const document = dom.window.document;

    //cookieJar = dom.cookieJar

    const token = document.querySelector("[name='_token']").value;

    try {
      //const loginResult =
      await this.axiosCall.post(
        loginUrl,
        qs.stringify({
          email: "florian.leica@gmail.com",
          password: "mU50j46EKiif",
          _token: token,
        }),
        {
          jar: cookieJar,
          withCredentials: true,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );

      /* const channelPage = await this.axiosCall.get("https://antenaplay.ro/live/antena1", {
        jar: cookieJar,
        withCredentials: true,
        headers: {
          referer: "https://antenaplay.ro/intra-in-cont",
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*!/!*;q=0.8,application/signed-exchange;v=b3;q=0.9",

        }
      })*/

      const channelPage = await this.JSDOM.fromURL(
        "https://antenaplay.ro/live/antena1",
        {
          pretendToBeVisual: true,
          cookieJar: cookieJar,
          //runScripts: "dangerously",
        }
      );
      //const documentChannel = dom.serialize();

      channelPage;
    } catch (er) {
      console.log(er);
    }
  }

  async workflow(): Promise<string> {
    //const channel = this.getChannel();
    //let result = "";

    await this.login();

    // First must login

    // Second must navigate to the live page

    // third, get the link from the html script

    try {
      return "";
    } catch (er) {
      return "";
    }
  }
}

module.exports = AntenaChannels;
