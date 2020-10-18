'use strict'
const fs = require('fs')
const m3u8Parser = require('iptv-playlist-parser')
const config = require('../config/channels')
const { template } = require('lodash')

async function getListaIptv () {
  // const content = await fs.readFileSync('assets/lista_iptv.m3u', 'utf8')
  const content = ['#EXTM3U']

  for (const group of config.groups) {
    for (const channel of group.channels) {
      const logo = template(config.tvg.logosUrl)

      content.push(`#EXTINF:-1 tvg-id="EPG N/A" tvg-name="${channel.name}" tvg-shift="" radio="" tvg-logo="${logo({ id: channel.logo })}" group-title="${group.groupTitle.toUpperCase()}", ${channel.name}`)
      content.push(`${process.env.SITE_URL}/${group.groupTitle.toLowerCase()}/${channel.id}`)
    }
  }

  return content.join('\n')
}

module.exports = function (fastify, opts, next) {
  fastify.get('/', async function (request, reply) {
    const parsedManifest = m3u8Parser.parse(await getListaIptv())

    reply.view('index', { data: parsedManifest })
  })

  fastify.get('/list', async function (request, reply) {
    const fs = require('fs')
    const stream = await getListaIptv()

    //reply.header("Content-Type", "application/vnd.apple.mpegurl");

    reply.send(stream)
  })

  fastify.get('/iptest', function (request, reply) {
    var ip = require('ip')

    reply.send(ip.address())
  })

  next()
}