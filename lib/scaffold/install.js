import git from 'gift'
import path from 'path'
import environment from './../builder/environment'

const env = new environment()

const { resolve } = path

const gitUrl = (name) => {
    return `https://github.com/Re-Rabbit/${name}.git`
}

const gitClone = (name) => (dir) => {
    git.clone(gitUrl(name), resolve(`${dir}/${name}`), (err, repo) => {
	      if(err) return console.log(err)
	      return console.log(repo)
    })
}

export default function(...opts) {

    const ptr = gitClone(opts[1])

    switch(opts[0]) {
    case "p":
    case "proj":
    case "project":
	      ptr(env.src)
	      break
    case "c":
    case "com":
    case "component":
	      ptr(env.components)
	      break
    default:
	      console.log(`Unknow install options: ${opts[0]}`)
	      break
    }
}
