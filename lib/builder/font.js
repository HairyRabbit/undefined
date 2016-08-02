import fs from 'fs'
import path from 'path'
import svgicons2svgfont from 'svgicons2svgfont'

const {
    basename,
    relative,
    extname,
    resolve,
    join
} = path


export default function(env) {
    let fontStream = svgicons2svgfont({
        fontName: 'hello'
    })


    fontStream.pipe(fs.createWriteStream('hello.svg'))
        .on('finish', _ => {
            console.log('done')
        })
        .on('error', err => {
            console.log(err)
        })


    const projectPath = resolve(env.src, 'icon-pool')
    const IconsJsonFilePath = resolve(projectPath, 'icons.json')
    const svgFilePath = name => path.join(__dirname, 'uploads', `${name}.svg`)

    let { icons, prefix } = JSON.parse(fs.readFileSync(IconsJsonFilePath, 'utf-8'))
}
