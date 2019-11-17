const axios = require('axios').default;
const puppeteer = require('puppeteer');
const mainURL = `https://antenaplay.ro/`;
const channelsMap = {
  1: "antena1",
  stars: "antena-stars",
  3: "antena3",
  happy: "happy-channel",
  zu: "zu-tv=",
  monden: "antena-monden",
  comedy: "comedy-play",
  cook: "cookplay",
  international: "antena-international"
};
let browser;
let page;

module.exports = function(fastify, opts, next) {

  fastify.get('/antena/:channel', async function(request, reply) {
    try {
      const streamLink = await getChannel(request.params.channel);

      console.log("Returning URL", streamLink);
      
      //reply.send("New Page URL\n" + page.url() + "\n" + streamLink);

      reply.redirect(streamLink)
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
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
      ],
    });
    page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      referer: `${mainURL}live/${channelsMap[channel]}`
    });
    await page.goto(`${mainURL}intra-in-cont`);

    console.log("Going to page", page.url());

    await page.type('[name="email"]', 'florian.leica@gmail.com');
    await page.type('[name="password"]', 'mU50j46EKiif');
    await page.keyboard.press('Enter');

    return returnStreamURL(true);

    //await browser.close();
  }

  async function returnStreamURL(waitNavigation = false) {
    try {
      if (waitNavigation) {
        await page.waitForNavigation({ waitUntil: "networkidle0" });
      }

      console.log("Scrapping page", page.url());

      const streamURL = await page.evaluate(() => liveSessionDetails.streamURL);

      return Promise.resolve(streamURL);
    } catch (er) {

      return Promise.reject(er);
    }
  }

  next()
}