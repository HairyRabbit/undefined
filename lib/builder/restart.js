import { exec, spawn } from 'child_process'
import forever from 'forever-monitor'

function isWin() {
    return process.platform === 'win32'
}


export default function() {
    //process.kill(process.pid, 2)
    return spawn(isWin() ? 'npm.cmd' : 'npm', ['start'], { stdio: "inherit" })
}


/*
const child = forever.start([
  'npm.cmd',
  'start'
], {
  uid: '444'
})
*/

const child = new (forever.Monitor)('', {
  command: 'node',
  args: ['--version']
})

child.start()
