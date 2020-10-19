'use strict'
const fs = require('fs')
const m3u8Parser = require('iptv-playlist-parser')
const config = require('../config/channels')
const { template, sortBy } = require('lodash')

function addOrderTag () {

}

async function getListaIptv () {
  // const content = await fs.readFileSync('assets/lista_iptv.m3u', 'utf8')
  const content = ['#EXTM3U']
  const channelsList = []

  for (const group of config.groups) {
    const groupId = group.groupTitle.toLowerCase()

    for (const channel of group.channels) {
      const logo = template(config.tvg.logosUrl)
      const orderId = config.tvg.order.indexOf(`${groupId}.${channel.id}`)
      const order = orderId >= 0 ? orderId + 1 : orderId

      channelsList.push({
        order: order,
        row1: `#EXTINF:${order} tvg-id="EPG N/A" tvg-name="${channel.name}" tvg-shift="" radio="" tvg-logo="${logo({ id: channel.logo })}" group-title="${groupId}", ${channel.name}`,
        row2: `${process.env.SITE_URL}/${groupId}/${channel.id}`
      })
    }
  }

  content.push(...sortBy(channelsList, 'order').map(_entry => _entry.row1 + '\n' + _entry.row2))

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

    // reply.header("Content-Type", "application/vnd.apple.mpegurl");
    reply.header('Content-Type', 'application/x-mpegURL')

    reply.send(stream)
  })

  fastify.get('/iptest', function (request, reply) {
    var ip = require('ip')

    reply.send(ip.address())
  })

  next()
}