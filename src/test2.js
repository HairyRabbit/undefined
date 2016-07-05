console.log(11111)

if(module.hot) {
    module.hot.accept()

    module.hot.dispose(data => {
        console.log(2222)
    })
}
