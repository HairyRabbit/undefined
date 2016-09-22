/*

  function add(a, b, c, d) { return a + b + c + d }

  let add10 = add(10)
  bar(20) //=> 30
*/

function partial(fn) {

  function wrapFunction() {
    let maxArgLen = fn.length
    let arglist = []

    return function partialFunction() {
      let args = [].slice.call(arguments)
      if(args.length < maxArgLen &&
         args.length + arglist.length < maxArgLen) {
        for(let i = 0; i < args.length; i++) arglist.push(args[i])
        return partialFunction
      }
      console.log(arglist, args)
      return fn.apply(fn, arglist.concat(args))
    }
  }

  return wrapFunction()

  /*
  return function partialFunction() {
    let opts = [].slice.call(arguments)
    if(opts.length < maxArgLen &&
       args.length + opts.length < maxArgLen) {
      for(let i = 0; i < opts.length; i++) args.push(opts[i])
      return partialFunction
    }

    console.log(args, opts)
    return fn.apply(fn, args.concat(opts))
  }
  */
}

const add = partial(function _add(a, b) {
  return a + b
})

console.log(
  add(10)(20),
  add(10, 20)
)


function p1() {
  let a = 10
  return function p2() {
    let a = a + 1
    console.log(a)
    return p2
  }
}

console.log(p1())
