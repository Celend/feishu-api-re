#! /usr/bin/env node

import protobufjs from 'protobufjs'
import url from 'url'
import fs from 'fs'
import path from 'path'

const messagePb = new protobufjs.Root()
messagePb.loadSync([
  'pb_out/contact/v1/chatters.proto',
  'pb_out/basic/v1/basic.proto',
  'pb_out/basic/v1/entities.proto',
])

const serverPb = new protobufjs.Root()
serverPb.loadSync(
  fs.readdirSync('pb_server_out').map(x => path.join('pb_server_out', x)).filter(x => x.endsWith('.proto'))
)

const packet = serverPb.lookupType('improto.Packet')

const msg = serverPb.lookupType(process.argv[2])
msg.resolveAll()

export async function decode() {
  const buffer = await new Promise((r) => {
    let buffer = Buffer.alloc(0)
    process.stdin.on('data', (data) => {
      buffer = Buffer.concat([buffer, data])
    })

    process.stdin.on('end', () => {
      r(buffer)
    })
  })
  const reader = new protobufjs.Reader(buffer)
  const p = packet.decode(reader)
  return JSON.stringify(msg.decode(p.payload), null, 2)
}

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  decode().then(console.log)
}
