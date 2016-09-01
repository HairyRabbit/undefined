'use strict'


const defineLibImportor = (path, name) => `\
import ${name} from '${path}';\
`

const defineObjImportor = (path, ...names) => `\
import {${names.join(',')}} from '${path}';\
`

const wrapTag = content => `<div>${content}</div>`

const main = () => {

  let defaultImport = [
    defineLibImportor('react', 'React'),
    defineLibImportor('./html/Import.js', 'Import')
  ]

  let ASTImport = [
    defineLibImportor('react', 'React'),
    defineLibImportor('./html/Import.js', 'Import'),
    defineLibImportor('./html/Button.js', 'Button')
  ].join('\n')

  let ASTBody = [
    '<Button>1</Button>',
    '<Button>2</Button>',
    '<Button>3</Button>'
  ].join('\n')

  let ASTOutlet = [

  ]


  return [
    ASTImport,
    //ASTOutlet,
    wrapTag(ASTBody)
  ].join('\n')
}


export default main
