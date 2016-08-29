import fs from 'fs'
import { transform } from 'babel-core'
import React, { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'

let opts = {
  presets: ['es2015', 'react']
}
//let out1 = transform(`import React from 'react';<div>1</div>`, opts)
//console.log(out1.code)
let file = fs.readFileSync('./lib/html/component.html', 'utf-8')
//console.log(file.match(/<([A-Z]+[\w|\.\s|\/]+)>/g))
let out1 = transform(`
import React from 'react';
import Button from './html/button.js';
import { Block } from './html/layout.js';
${file}
`, opts)

console.log(out1.code)

// dangerouslySetInnerHTML={{__html: basic }}

class Render extends Component {
  render() {

    const head = Helmet.rewind()
    const attrs = head.htmlAttributes.toComponent()

    return (
      <html>
        <head>
          { head.title.toComponent() }
        </head>
        <body>
          { eval(out1.code) }
        </body>
      </html>
    )
  }
}

let out = renderToStaticMarkup(<Render />)
let doctype = '<!doctype html>'
console.log(doctype + out)

