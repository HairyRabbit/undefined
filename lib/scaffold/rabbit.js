import fs from 'fs'
import install from './install'

const args = process.argv.slice(2)

function main() {
    switch(args[0]) {
    case "i":
	install.apply(null, args.slice(1))
	break
    default:
	console.log('Unknow Options')
	break
    }
}

main()

// rabbit h
// rabbit n p {name}
// rabbit n c {name}
// rabbit d p {name}
// rabbit d c {name}
// rabbit i p {url}
// rabbit i c {url}
