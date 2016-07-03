console.log(3)

if(module.hot) {
    module.hot.accept()

    module.hot.dispose(data => {
        console.log(13)
    })
}
