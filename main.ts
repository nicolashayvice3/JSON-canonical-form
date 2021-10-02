const fs = require('fs')

const file = process.argv[2]

main()

function main () {
  const processedFile = processFile(file)
  encode(processedFile); decode(processedFile); process.exit(0)
}

function processFile (file) {
  const content = fs.readFileSync(file, 'utf8')
  return content
}

function encode (arg) {
  const encoded = arg
  console.log('encoding: ', typeof (encoded), encoded)
}

function decode (arg) {
  const decoded = JSON.parse(arg)
  console.log('decoding: ', typeof (decoded), decoded)
}
