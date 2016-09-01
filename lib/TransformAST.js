'use strict'

import { transform } from 'babel-core'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'


const DOCType = '<!doctype html>'
const babelOption = {
  presets: ['latest', 'react']
}

const Render = props => {

  let {
    HookContent,
    HookHeader,
    HookFooter
  } = props

  return (
    <html lang="en">
      <head>
        { HookHeader }
      </head>
      <body>
        { HookContent }
        { HookFooter }
      </body>
    </html>
  )
}


const transAST = ast => {
  let { code } = transform(ast, babelOption)

  return eval(code)
}



const main = ast => {
  let transed = transAST(ast)

  let out = renderToStaticMarkup(<Render HookContent={ transed } />)
  let doctype = '<!doctype html>'

  return DOCType + out
}


export default main
