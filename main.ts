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
  fs.readFile(file, (err, data) => {
    if (err) {
      console.error('Need a adecuate file for JSON decoding or encoding')
      process.exit(1)
    }
    const content = data

    return content
  })
}

function encode () {
  console.log('encoding')
}

function decode () {
  console.log('decoding')
}
