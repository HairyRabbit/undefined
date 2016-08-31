import fs from 'fs'
import { transform } from 'babel-core'
import React, { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'

let opts = {
  presets: ['es2015', 'react']
}

let file = fs.readFileSync('./lib/html/basic.html', 'utf-8')
//console.log(file.match(/<([A-Z]+[\w|\.\s|\/]+)>/g))
let out1 = transform(`
import React from 'react';
import Import from './html/Import.js'
import Button from './html/button.js';
import { Block } from './html/layout.js';

<body>${file}</body>
`, opts)


const outlet = (ast) => {
  let regex = '<Outlet\\s*(\\w*)\\s*\\/?>'
  let out = ast.replace(new RegExp(regex, 'g'), (_, a) => {
    return `{ outlets["${a || 'default'}"] }`
  })

  return out
}

let out2 = transform(`
import React from 'react';
import Import from './html/Import.js'
import Button from './html/button.js';
import { Block } from './html/layout.js';

let outlets = {};
outlets["default"] = <div>123</div>;

<body>${outlet(fs.readFileSync('./lib/html/parent.html', 'utf-8'))}</body>
`, opts)
console.log(out2.code)


let outreact = eval(out1.code)

let test = outreact//.props.children//.filter(n => n.type === 'import')

//console.log(out1.code)
console.log(outreact.props.children)

// AST -> replaceClassAttrToClassName

function replaceClassAttrToClassName(ast) {
  return ast.replace('class', 'className')
}

class Render extends Component {
  render() {

    const head = Helmet.rewind()
    const attrs = head.htmlAttributes.toComponent()

    return (
      <html>
        <head>
          { head.title.toComponent() }
        </head>
        { eval(out2.code) }
      </html>
    )
  }
}

let out = renderToStaticMarkup(<Render />)
let doctype = '<!doctype html>'
console.log(doctype + out)

