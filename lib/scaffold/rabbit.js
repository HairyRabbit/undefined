import install from './install'
import server from './server'

const args = process.argv.slice(2)

function main() {
    switch(args[0]) {
    case "i":
    case "install":
	install.apply(null, args.slice(1))
	break
    case "s":
    case "server":
	server.apply(null, args.slice(1))
	break
    case "h":
    case "-h":
    case "help":
    default:
	console.log('rabbit s', 'start server')
	console.log('rabbit i p {name}', 'install a existed project from github')
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
// rabbit s
