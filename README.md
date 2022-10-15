# feishu-api-re
Lark api reverse engineering / 飞书 API 逆向工程

## Disclaimer

This project just intended for learning and research and non-commercial usage.

I'll not provide any decompiled code or data, if this project harms your rights, please contact me to take down.

## Arch Overview

```plantuml
[Server] as server
note left of server
  protocol: gRPC?
  serializer: protobuf
end note

[Android Client] as android

[HTTP Gateway] as gateway

note left of gateway
  convert gRPC to HTTP
  wrap req/resp to improto.Packet msg
  provide authn and session
end note

[PC Client] as pc

[Web Client] as web
note left of web: using protobufjs

android -up-> server
pc -up-> server
web -up-> gateway

gateway -up-> server
```

## setup

checkout and cd to project.

### Restore protobuf descriptor to source

Using [pbtk](https://github.com/marin-m/pbtk/) to restoring proto files by descriptor file.

`pb.desc` and `pb_server.desc` can be found on Feishu install location.

Running following commands to restore the proto files:
```bash
./pbtk/extractors/from_binary.py path/to/pb.desc pb_out
./pbtk/extractors/from_binary.py path/to/pb_server.desc pb_server_out
```

### Install deps

`npm install`

### Get cookies

Login to feishu web messenger, copy the whole cookie to call.js file.

## Usage

```bash
./encode.js <COMMAND> | ./call.js  | ./decode.js <RESPONSE_TYPE> 
```

- COMMAND: can be found in `pb_server_out/improto.proto` and type `Packet.cmd`
- RESPONSE_TYPE: Usually match with command

### Example

```bash
# COMMAND PULL_EMOJI_RESOURCES_V2 = 142
./encode.js 142 | ./call.js  | ./decode.js PullEmojiResourcesV2Response
```

### Post data

todo
