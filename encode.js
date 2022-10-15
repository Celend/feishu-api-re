#! /usr/bin/env node

import protobufjs from 'protobufjs'
import url from 'url'

const serverPb = new protobufjs.Root()
serverPb.loadSync('pb_server_out/improto.proto')

const packet = serverPb.lookupType('improto.Packet')

export function getPacket() {
  return packet.encode({
    payloadType: 1,
    cmd: ~~process.argv[2],
  }).finish()
}

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  process.stdout.write(getPacket())
}
