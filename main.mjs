#!/usr/bin/env node

// import { canonicalize } from 'json-canonicalize'

import fs from 'fs'

const file = process.argv[2]

main()
console.log(file)

function main () {
  const processedFile = processFile(file)

  const encoded = encode(processedFile)

  for (let i = 0; i < encoded.length; i++) {
    const item = encoded[i]
    if (typeof item === 'number') {
      const longNumber = toFixed(item)
      encoded.splice(i, 1, longNumber)
    }
    const itemStringy = JSON.stringify(item)
    if (itemStringy.startsWith('"\\u')) {
      if (itemStringy.length === 14) {
        const upper = itemStringy.toUpperCase()
        let lowerU = upper.charAt(2).toLowerCase() + upper.slice(3)
        lowerU = lowerU.slice(7, 14)
        const lowerU2 = upper.charAt(8).toLowerCase() + upper.slice(9)
        const string = '"\\u'
        let finalItem = `${string}${lowerU}\\${lowerU2}`
        finalItem = finalItem.replace(/"/g, '')
        encoded.splice(i, 1, JSON.parse(`"${finalItem}"`))
      } else {
        let capital = itemStringy.slice(3)
        capital = capital.toUpperCase()
        const string = '"\\u'
        const stringCapital = string.concat(capital.toString())
        encoded.splice(i, 1, JSON.parse(stringCapital))
      }
    }
    if (itemStringy.startsWith('{"\\u')) {
      if (itemStringy.length === 18) {
        const upper = itemStringy.toUpperCase()
        let lowerU = upper.charAt(3).toLowerCase() + upper.slice(4)
        let lowerU2 = lowerU.slice(6, 15)
        lowerU2 = lowerU2.charAt(0).toLowerCase() + lowerU2.slice(1)
        const string = '{"\\'
        lowerU = lowerU.slice(0, 6)
        const finalUString = lowerU.concat(lowerU2)
        const finalItem = `${string}${finalUString}`
        encoded.splice(i, 1, JSON.parse(finalItem))
      } else {
        let capital = itemStringy.slice(4)
        capital = capital.toUpperCase()
        const string = '{"\\u'
        const objStringCapital = string.concat(capital.toString())
        encoded.splice(i, 1, JSON.parse(objStringCapital))
      }
    }
  }
  const decoded = decode(encoded)

  console.log('Result: ', decoded); process.exit(0)
}

function processFile (file) {
  const content = fs.readFileSync(file, 'utf8')
  return content
}

function encode (arg) {
  const encoded = JSON.parse(arg)
  console.log('encoding: ', typeof (encoded), encoded)
  return encoded
}

function decode (arg) {
  const decoded = canonicalize(arg)
  console.log('decoding: ', typeof (decoded), decoded)
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

function canonicalize (obj) {
  let buffer = ''

  serialize(obj)

  return buffer

  function serialize (object) {
    if (
      object === null ||
      typeof object !== 'object' ||
      object.toJSON != null
    ) {
      buffer += JSON.stringify(object)
    } else if (Array.isArray(object)) {
      buffer += '['
      let next = false
      object.forEach((element) => {
        if (next) {
          buffer += ','
        }
        next = true
        serialize(element)
      })
      buffer += ']'
    } else {
      buffer += '{'
      const vKeys = Object.keys(object).sort()
      vKeys.forEach((property, index) => addProp(object, property, index))
      buffer += '}'
    }
  }

  function addProp (object, property, index) {
    if (index > 0) {
      buffer += ','
    }

    buffer += JSON.stringify(property)
    buffer += ':'
    serialize(object[property])
  }
}
