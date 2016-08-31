import React, { PureComponent } from 'react'
import { extname } from 'path'

const isStyleFile = (src) => extname(src) === '.css'
const isScriptFile = (src) => extname(src) === '.js'

class Import extends PureComponent {
  render() {

    let { src } = this.props

    if(isStyleFile(src))
      return <link href={src} rel="stylesheet" />

    return <script src={src}></script>
  }
}


export default Import
