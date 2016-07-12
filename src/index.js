import Elm from 'react-elm-components'
import React from 'react'
import $ from 'jquery'
import { render } from 'react-dom'
import Snippets from 'Snippets/Main.elm'


render(
    <Elm src={Snippets.Main} />,
    document.getElementById('main')
)


/*
let target = `
# -*- mode: snippet -*-
#name : Class
# --
var $\{1:name\} = new Class({
  initialize: function($2) {
    $0
  }
});
`
*/
//let target = 'Class'
let target = [
    'C',
    'Cl',
    'Cla',
    'Clas',
    'Class',
    `
var $\{1:name\} = new Class({
  initialize: function($2) {
    $0
  }
});
`,
        `
var n = new Class({
  initialize: function($2) {
    $0
  }
});
`,
    `
var na = new Class({
  initialize: function($2) {
    $0
  }
});
`,
    `
var nam = new Class({
  initialize: function($2) {
    $0
  }
});
`,
    `
var name = new Class({
  initialize: function($2) {
    $0
  }
});
`,
    `
var name = new Class({
  initialize: function() {
    $0
  }
});
`,
    `
var name = new Class({
  initialize: function() {
    
  }
});
`
]

/*
var timer = setInterval(_ => {
    if(offset >= target.length) {
        clearInterval(timer)
        return
    }
    //console.log(target[offset])
    //$('#test').html(target[offset])
    offset = offset + 1
}, 300)
*/

let test = `
var $\{1:name\} = new Class({
  initialize: function($\{2:test\}) {
    $\{3:content\}
  }$1
});
`
var m1 = test.match(/\$\{(\d+)\:(\w+)\}/g)
    .map(n => n.match(/\$\{(\d+)\:(\w+)\}/).slice(1))
    .sort(n => parseInt(n[0]))
    .map(n => [n[0], [].map.call(n[1], (m, i, l) => l.substr(0, i + 1) )])
    .reduce(
        (acc, curr) => {
            let [idx, arr] = curr
            let re = new RegExp(`\\$\\{*${idx}\\:*(\\w+)*\\}*`, 'g')
            let tpl = acc.length === 0 ? test : acc.slice(-1)[0].slice(-1)[0]
            return acc.concat(
                [arr.map(n => tpl.replace(re, n))]
            )
        }, []
    )
    .reduce(
        (acc, curr) => acc.concat(curr), []
    )

var m2 = [].concat([].map.call("Class", (m, i, l) => l.substr(0, i + 1)), m1)
//console.log(m2)

let offset = 0
/*
var timer = setInterval(_ => {
    if(offset >= m2.length) {
        clearInterval(timer)
        return
    }
    //console.log(m2[offset])
    $('pre').html(m2[offset])
    offset = offset + 1
}, 300)
*/
//var m11 = m1.match(/\$\{*\d+\:*(\w+)*\}*/)[1]
///*
//var m2 = ["n", "na", "nam", "name"]

//console.log(m1, m2.map(n => {
    //console.log(test.replace(/\$\{*1\:*(\w+)*\}*/g, n))
  //    return test.replace(/\$\{*1\:*(\w+)*\}*/g, n)
//}))
//*/
