import Path from 'path'
import TransformAST from './TransformAST'
import MakeHtml from './MakeHTML'
import { html } from 'js-beautify'

const htmlOption = {
  indent_size: 2,
  indent_char: ' ',
  indent_inner_html: true,
  preserve_newlines: false,
  end_with_newline: true,
  unformatted: [],
  extra_liners: [],
}

const constAsset = contents => {
  return {
    source: () => contents,
    size: () => contents.length
  }
}


class RenderHTMLWebpackPlugin {
  constructor(opts) {
    this.options = opts
  }

  apply(compiler) {
    compiler.plugin('emit', (compiler, done) => {
      try {
        let maked = MakeHtml()
        let transed = TransformAST(maked)
        let out = html(transed, htmlOption)

        compiler.assets['html/index.html'] = constAsset(out)

        console.log(compiler.assets)

        done()


      } catch(e) {
        return done(e)
      }

      done()
    })
  }
}


export default RenderHTMLWebpackPlugin
