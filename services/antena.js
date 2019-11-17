const axios = require('axios').default;
const puppeteer = require('puppeteer');
const mainURL = `https://antenaplay.ro/`;
const channelsMap = {
  1: "antena1",
  stars: "antena-stars",
  3: "antena3",
  happy: "happy-channel",
  zu: "zu-tv",
  monden: "antena-monden",
  comedy: "comedy-play",
  cook: "cookplay",
  international: "antena-international"
};
let browser;
let page;
let linksList = {
  "1": "https://ivm.antenaplay.ro/live/a1/playlist.m3u8?starttime=1574033943&endtime=1574041173&source=web&token=wCHUu-1kBKAt1WeQcpckHYthxAo=",
  "3": "https://ivm.antenaplay.ro/live/a3/playlist.m3u8?starttime=1574033944&endtime=1574041174&source=web&token=ZzrtqHkmZew7YpZBOJ124538Wws=",
  "stars": "https://ivm.antenaplay.ro/live/astars/playlist.m3u8?starttime=1574033946&endtime=1574041176&source=web&token=B0PEotg0GnIhdS-Hx4pQ6bhhxIA=",
  "happy": "https://ivm.antenaplay.ro/live/happy/playlist.m3u8?starttime=1574033947&endtime=1574041177&source=web&token=eYTi_o3GJGMdpK1hCIhgc-3GgI4=",
  "zu": "https://ivm.antenaplay.ro/live/zu/playlist.m3u8?starttime=1574033949&endtime=1574041179&source=web&token=vV1Kr4paB7L_Lf7M6WomukoKMDg=",
  "monden": "https://stream1.antenaplay.ro/live/smil:AntenaMonden.smil/playlist.m3u8?starttime=1574033950&endtime=1574041180&source=web&token=B46_Ct5wjOOTkQLL8Qlg3rFclSo=",
  "comedy": "https://stream1.antenaplay.ro/live/smil:ComedyPlay.smil/playlist.m3u8?starttime=1574033952&endtime=1574041182&source=web&token=RG06t_FbPOu4IRdFORwKI60J4Y8=",
  "cook": "https://stream1.antenaplay.ro/live/smil:CookPlay.smil/playlist.m3u8?starttime=1574033953&endtime=1574041183&source=web&token=Pv2Z3qAeUPFED7lJ8pc91nnUi5U=",
  "international": "https://ivm.antenaplay.ro/live/ai/playlist.m3u8?starttime=1574033955&endtime=1574041185&source=web&token=1iGr7GY7XKDpugl99CBmjdOaWNs="
}

module.exports = function(fastify, opts, next) {
  fastify.get('/antena/parse', async function(request, reply) {
    await parseAllChannels();

    reply.send(JSON.stringify(linksList))
  })

  fastify.get('/antena/:channel', async function(request, reply) {
    try {
      //const streamLink = await getChannel(request.params.channel);
      //const cookies = await page.cookies()

      /*  const content = await page.goto(streamLink)
       const text = await content.text();

       console.log("Returning URL", streamLink);
*/
      /* cookies.forEach(cookie => {
        reply.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          path: cookie.path,
          httpOnly: cookie.httpOnly,
        })
      }) */

      //reply.send(streamLink);

      reply.redirect(linksList[request.params.channel])
    } catch (err) {
      reply.send(err);
    }
  })

  async function getChannel(channel) {
    if (!page) {
      return puppeteerLogin(channel);
    }

    await page.goto(`${mainURL}live/${channelsMap[channel]}`);

    console.log("Getting Channel", page.url());

    return returnStreamURL();
  }

  async function puppeteerLogin(channel) {
    if (!browser) {
      browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          //"--proxy-server=it106.nordvpn.com:80"
        ],
      });
    }

    if (!page) {
      page = await browser.newPage();
    }

    /* page.authenticate({
      username: 'florian.leica@gmail.com',
      password: '5&gt5MBmUUl1fT99'
    }); */

    if (channel) {
      await page.setExtraHTTPHeaders({
        referer: `${mainURL}live/${channelsMap[channel]}`
      });
    }

    await page.goto(`${mainURL}intra-in-cont`);

    console.log("Going to page", page.url());

    await page.type('[name="email"]', 'florian.leica@gmail.com');
    await page.type('[name="password"]', 'mU50j46EKiif');
    await page.keyboard.press('Enter');


    if (channel) {
      return returnStreamURL(true);
    } else {
      await page.waitForNavigation();
    }
    //await browser.close();
  }

  async function returnStreamURL(waitNavigation = false) {
    try {
      if (waitNavigation) {
        await page.waitForNavigation();
      }

      console.log("Scrapping page", page.url());

      const streamURL = await page.evaluate(() => {
        if (liveSessionDetails) {
          return liveSessionDetails.streamURL;
        } else {
          ""
        }
      });

      return Promise.resolve(streamURL);
    } catch (er) {

      return Promise.reject(er);
    }
  }

  async function parseAllChannels() {
    const keys = Object.keys(channelsMap);

    await puppeteerLogin();
    await parseChannel(keys[0], 1);

    return Promise.resolve(linksList);
  }

  async function parseChannel(key, nextIndex) {
    const keys = Object.keys(channelsMap);

    console.log("Parsing channel", key);

    linksList[key] = await getChannel(key);

    if (keys[nextIndex]) {
      await parseChannel(keys[nextIndex], nextIndex + 1)
    }
  }

  next()
}