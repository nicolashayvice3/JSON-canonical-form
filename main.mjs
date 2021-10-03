#!/usr/bin/env node

import { canonicalize } from 'json-canonicalize'

import fs from 'fs'

const file = process.argv[2]

main()
console.log(file)

function main () {
  const processedFile = processFile(file)

  const encoded = encode(processedFile)

  for (let i = 0; i < encoded.length; i++) {
    if (typeof encoded[i] === 'number') {
      const longNumber = toFixed(encoded[i])
      encoded.splice(i, 1, longNumber)
    }
  }

  for (const [key, value] of Object.entries(encoded)) {
    console.log('KEY: ', JSON.stringify(key), '\nVALUE: ', value)
    if (encoded[key].startsWith('\\u')) {
      let capital = encoded[key].slice(2)
      capital = capital.toUpperCase()
    }
  }

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
  const decoded = canonicalize(arg)
  // console.log('decoding: ', typeof (decoded), decoded)
  return decoded
}

function toFixed (x) {
  if (Math.abs(x) < 1.0) {
    const e = parseInt(x.toString().split('e-')[1])
    if (e) {
      x *= Math.pow(10, e - 1)
      x = '0.' + (new Array(e)).join('0') + x.toString().substring(2)
    }
  } else {
    let e = parseInt(x.toString().split('+')[1])
    if (e > 20) {
      e -= 20
      x /= Math.pow(10, e)
      x += (new Array(e + 1)).join('0')
    }
  }
  return x
}