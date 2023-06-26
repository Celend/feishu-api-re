#! /usr/bin/env node

const protobufjs = require('protobufjs')
const url = require('url')
const fs = require('fs')
const path = require('path')

const serverPb = new protobufjs.Root()
serverPb.loadSync(
  fs.readdirSync('pb_server_out').map(x => path.join('pb_server_out', x)).filter(x => x.endsWith('.proto'))
)

const packet = serverPb.lookupType('improto.Packet')

const inputType = serverPb.lookupType(process.argv[3])

function getPacket() {
  const msg = JSON.parse(fs.readFileSync(process.stdin.fd, 'utf-8'))
  return packet.encode({
    payloadType: 1,
    cmd: ~~process.argv[2],
    payload: Buffer.from(inputType.encode(msg).finish()),
  }).finish()
}

if (require.main === module) {
  process.stdout.write(getPacket())
}
