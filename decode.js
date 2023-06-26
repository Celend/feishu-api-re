#! /usr/bin/env node

const protobufjs = require('protobufjs')
const url = require('url')
const fs = require('fs')
const path = require('path')

const messagePb = new protobufjs.Root()
messagePb.loadSync(
  fs.readdirSync('pb_server_out').map(x => path.join('pb_server_out', x)).filter(x => x.endsWith('.proto'))
)

const serverPb = new protobufjs.Root()
serverPb.loadSync(
  fs.readdirSync('pb_server_out').map(x => path.join('pb_server_out', x)).filter(x => x.endsWith('.proto'))
)

const packet = serverPb.lookupType('improto.Packet')

const msg = serverPb.lookupType(process.argv[2])
msg.resolveAll()

async function decode() {
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

if (require.main === module) {
  decode().then(console.log)
}
