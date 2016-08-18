/**
 *
 */


import fs from 'fs'
import path from 'path'
import { Stack } from 'immutable'


let doc = `
////
/// Rabbit/Util Grid.
///
/// @namespace util.
/// @author Rabbit<yfhj1990@hotmail.com>
////

///
// u-row
//
// Float Base or Flex Base layout, default use float.
//
// @mixin
//
// @param {unit} [$gutter=1.5rem] - Grid gutters.
// @param {boolean} [$flex=false] - Switch to flex.
///
u-row($gutter = 1.5rem, $flex = false)
`

// FileDescript

let isInFileDescriptionScope = false
let fileDescriptionContent = []
let isInMultiLineScope = false
let multiLineContent = []


const RegexFileDescription = /\/{4}/

function parseFileDescriptionScope(line) {
  if(RegexFileDescription.test(line)) {
    isInFileDescriptionScope = !isInFileDescriptionScope
  }
}


const RegexFileName = /\/{3}\s(\w+)\/(\w+)\s(\w+)/

function parseFileName(line) {
  if(RegexFileName.test(line)) {
    console.log(line.match(RegexFileName))
  }
}

const RegexNamespace = /\/{3}\s@namespace\s(\w+)/

function parseNamespace(line) {
  if(RegexNamespace.test(line)) {
    console.log(line.match(RegexNamespace))
  }
}

const RegexAuthor = /\/{3}\s@author\s(\w+)<([\w|@|\.]+)>/

function parseAuthor(line) {
  if(RegexAuthor.test(line)) {
    console.log(line.match(RegexAuthor))
  }
}


// Muilt line.
const RegexMultiLine = /\/{3}/

function parseMultiLineScope(line) {
  if(!isInFileDescriptionScope && RegexFileDescription.test(line)) {
    isInMultiLineScope = !isInMultiLineScope
  }
}


const RegexName = /\/{2}\s([u|c])-([\w|-|_]+)/

function parseName(line) {
  if(RegexName.test(line)) {
    console.log(line.match(RegexName))
  }
}

const RegexMixin = /\/{2}\s@mixin/

function parseMixin(line) {
  if(RegexMixin.test(line)) {
    console.log(line.match(RegexMixin))
  }
}


const RegexFunction = /\/{2}\s@function/

function parseFunction(line) {
  if(RegexFunction.test(line)) {
    console.log(line.match(RegexFunction))
  }
}


const RegexParam = /\/{2}\s@param\s\{(\w+)\}\s(\[([\w|\$]+)=(\w+)\]?)(\s-\s([\w|\s|\.|`|\@]+)?)/

function parseParam(line) {
  if(RegexParam.test(line)) {
    console.log(line.match(RegexParam))
  }
}


function parseLine(line) {

  // Parse scope.
  parseFileDescriptionScope(line)
  parseMultiLineScope(line)

  if(isInFileDescriptionScope) {
    parseFileName(line)
    parseNamespace(line)
    parseAuthor(line)
  }

  if(isInMultiLineScope) {
    parseName(line)
    parseMixin(line)
    parseFunction(line)
    parseParam(line)
  }

}


// MuiltLine


export default function parseExport() {
  let lines = doc.split('\n')
  for(let i in lines) {
    let line = lines[i]
    parseLine(line)
  }
}
