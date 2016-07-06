import git from 'gift'
import path from 'path'

const { resolve } = path

function gitUrl(name) {
    return `https://github.com/Re-Rabbit/${name}.git`
}

function gitClone(name) {
    git.clone(gitUrl(name), resolve(`src/${name}`), (err, repo) => {
	if(err) return console.log(err)
	console.log(repo)
    })
}

export default function(...opts) {
    switch(opts[0]) {
    case "p":
    case "proj":
    case "project":
	gitClone(opts[1])
	break
    default:
	console.log(`Unknow install options: ${opts[0]}`)
	break
    }
}
