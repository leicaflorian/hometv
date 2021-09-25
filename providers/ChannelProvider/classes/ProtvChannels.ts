import * as jsdom from "jsdom";
import { BasicChannel } from "./BasicChannel";
import * as tough from "tough-cookie";
import qs from "qs";
import axiosCookieJarSupport from "axios-cookiejar-support";

class ProtvChannels extends BasicChannel {
  public JSDOM = jsdom.JSDOM;
  public cookieJar: tough.CookieJar = new tough.CookieJar();

  async login() {
    axiosCookieJarSupport(this.axiosCall);
    const dom = await this.JSDOM.fromURL("https://protvplus.ro/login", {
      pretendToBeVisual: true,
      cookieJar: this.cookieJar,
    });
    const document = dom.window.document;

    /* document.querySelector("[name='email']").value = "florian.leica@gmail.com";
    document.querySelector("[name='password']").value = "b*7i^H4Xe%i6@#E";
    document.querySelector("form").submit(); */

    try {
      //const loginResult =
      const result = await this.axiosCall.post(
        "https://protvplus.ro/login",
        qs.stringify({
          email: "florian.leica@gmail.com",
          password: "b*7i^H4Xe%i6@#E",
          _do: "content11374-loginForm-form-submit",
        }),
        {
          jar: this.cookieJar,
          withCredentials: true,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(result);
    } catch (er) {
      console.log(er);
    }
  }

  async workflow(): Promise<string> {
    const channel = this.getChannel();
    let result = "";

    await this.login();

    try {
      const dom = await this.JSDOM.fromURL(channel?.embed ?? "", {
        pretendToBeVisual: true,
        cookieJar: this.cookieJar,
      });
      const document = dom.window.document;

      for (const script of document.scripts) {
        if (script.text.includes("Player.init")) {
          const match = script.textContent.match(/(src).*(m3u8)/)[0];

          result = match.replace(/src.*"/, "");
        }
      }

      return result.replace(/\\/g, "");
    } catch (er) {
      console.log(er);
      return "";
    }
  }
}

module.exports = ProtvChannels;
