'use strict'
const fs = require("fs");
const axios = require('axios');
const m3u8Parser = require("iptv-playlist-parser");

async function getListaIptv() {
  const content = await fs.readFileSync('assets/lista_iptv.m3u', 'utf8');

  return content;
}

module.exports = function(fastify, opts, next) {
  fastify.get("/", async function(request, reply) {
    const parsedManifest = m3u8Parser.parse(await getListaIptv());    

    reply.view("index", { data: parsedManifest });
  })

  fastify.get("/list", async function(request, reply) {
    const fs = require('fs')
    const stream = await getListaIptv()

    //reply.header("Content-Type", "application/vnd.apple.mpegurl");

    reply.send(stream)
  })

  fastify.get('/iptest', function(request, reply) {
    var ip = require("ip");

    reply.send(ip.address())
  })

  next()
}