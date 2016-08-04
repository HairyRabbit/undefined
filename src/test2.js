console.log(11111)

if(module.hot) {
    module.hot.accept()

    module.hot.dispose(data => {
        console.log(2222)
    })
}

console.log(
    [{ a: 1 }, { b: 2 }].reduce(::Object.assign, {})
)

export default { a: 1 }