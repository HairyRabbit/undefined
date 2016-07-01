console.log(1)

if(module.hot) {
    module.hot.accept()

    module.hot.dispose(data => {
        console.log(13)
    })
}
