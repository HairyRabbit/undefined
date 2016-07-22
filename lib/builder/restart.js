import { exec, spawn } from 'child_process'


function isWin() {
    return process.platform === 'win32'
}


export default function() {
    //process.kill(process.pid, 2)
    return spawn(isWin() ? 'npm.cmd' : 'npm', ['start'], { stdio: "inherit" })
}
