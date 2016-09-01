import FS from 'fs'
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

const main = (path, content) => {
  FS.writeFileSync(path, html(content, htmlOption))
}

export default main
