#!/usr/bin/env node

const fs = require('fs')

const file = process.argv[2]

main()
console.log(file)

function main () {
  const processedFile = processFile(file)

  const encoded = encode(processedFile)
  // console.log('encoded-main: ', encoded)

  const decoded = decode(encoded)

  console.log(decoded); process.exit(0)
}

function processFile (file) {
  const content = fs.readFileSync(file, 'utf8')
  return content
}

function encode (arg) {
  const encoded = JSON.parse(arg)
  // console.log('encoding: ', typeof (encoded), encoded)
  return encoded
}

function decode (arg) {
  const decoded = JSON.stringify(arg)
  // console.log('decoding: ', typeof (decoded), decoded)
  return decoded
}
