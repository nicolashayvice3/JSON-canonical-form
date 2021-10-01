const fs = require('fs')

const file = process.argv[2]

const action = process.argv[3]

main()

function main () {
  const processedFile = processFile(file)
  switch (action) {
    case 'encode':
      encode(processedFile)
      break
    case 'decode':
      decode(processedFile)
      break
    default:
      console.error('Function requires encode or decode, try again')
      process.exit(1)
  }
}

function processFile (file) {
  const content = fs.readFileSync(file, 'utf8')
  return content
}

function encode (arg) {
  const encoded = arg
  console.log('encoding: ', encoded)
  return encoded
}

function decode (arg) {
  const decoded = JSON.parse(arg)
  console.log('decoding: ', decoded)
  return decoded
}
