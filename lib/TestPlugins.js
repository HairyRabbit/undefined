'use strict'

const Tapable = require('tapable')


class Class extends Tapable {}


var cc = new Class()

cc.plugin('test', (arg, next) => {
  console.log('test1', arg)
  next(null, 1)
  return arg
})
cc.plugin('test', (arg, next) => {
  console.log('test2', arg)
  next(null, 2)
  return arg
})
cc.plugin('test', (arg, next) => {
  console.log('test3', arg)
  next(null, 3)
  return arg
})

cc.applyPluginsParallelBailResult('test', 1, function(err, value) {
  console.log('done', err, value)
})

console.log(cc, 1)
