import fs from 'fs'
import path from 'path'
import toml from 'toml'
import program from 'commander'
import install from './install'
import server from './server'

const configPath = path.resolve('.rabbit')
const config = toml.parse(fs.readFileSync(configPath))

program
    .version(config.version)

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

if(!program.args.length)
    program.outputHelp()


// rabbit h
// rabbit n p {name}
// rabbit n c {name}
// rabbit d p {name}
// rabbit d c {name}
// rabbit i p {url}
// rabbit i c {url}
// rabbit s
