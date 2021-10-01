
var cli = process.argv[2]

main()

function main() {
    switch (cli) {
        case 'encode':
            encode()
            break
        case 'decode':
            decode()
            break
        default:
            console.error('Function requires encode or decode, try again')
            process.exit(1)
    }
}
