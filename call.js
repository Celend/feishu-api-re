#! /usr/bin/env node

import fetch from 'node-fetch'

fetch("https://internal-api-lark-api.feishu.cn/im/gateway/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-protobuf",
    "locale": "zh_CN",
    "x-command": "5017",
    "x-command-version": "2.7.0",
    "x-source": "web",
    "x-web-version": "3.9.17",
    "cookie": "<YOUR COOKIES HERE>",
    "Referer": "https://www.feishu.cn/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": process.stdin,
  "method": "POST"
}).then(x => x.arrayBuffer()).then(b => process.stdout.write(Buffer.from(b)));
