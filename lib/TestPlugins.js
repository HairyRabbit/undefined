'use strict'

const Tapable = require('tapable')


class Class extends Tapable {}


var cc = new Class()

cc.plugin('test', () => console.log(1))

console.log(cc)
