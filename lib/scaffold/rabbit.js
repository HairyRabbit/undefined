import program from 'commander'
import install from './install'
import server from './server'

program
    .version('1.0.0')

program
    .command('server')
    .alias('s')
    .description('start rabbit server')
    .action(server)

program
    .command('install <type> [name]')
    .alias('i')
    .description('install projects components and plugs from github')
    .action(install)

program
    .command('*')
    .action(cmd => {
	console.log('Unknow commands', cmd)
	program.outputHelp()
    })

program
    .parse(process.argv)
    

// rabbit h
// rabbit n p {name}
// rabbit n c {name}
// rabbit d p {name}
// rabbit d c {name}
// rabbit i p {url}
// rabbit i c {url}
// rabbit s
