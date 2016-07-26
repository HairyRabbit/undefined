// -*- mode: react -*-
import Elm from 'react-elm-components'
import React, { Component } from 'react'
import $ from 'jquery'
import { render } from 'react-dom'
import Snippets from 'Snippets/Main.elm'
import Slider from 'Slider/index.jsx'

class App extends Component {
  render() {
	  return (
	    <div>
	      <Elm src={Snippets.Main} ports={setupPorts} />
	      <Slider />
	    </div>
	  )
  }
}

function setupPorts(ports) {
    console.log( ports )

    ports.fetchSize.subscribe(uuid => {
        let el = $(`[data-uuid=${uuid}]`)
        //let elWidth = el.getBoundingClientRect().width
        let elWidth = el.find('.slider__line').width()

        //ports.precentage.send(elWidth)
        setTimeout(_ => ports.precentage.send(elWidth), 0)
    })
}

render(
  <App />,
  document.getElementById('main')
)

/**
   ___browserSync___.socket.emit('test', 2333)

   var ws = new WebSocket('ws://localhost:9999')
   ws.send('233')
 */
var ws = new WebSocket('ws://localhost:9999')
___browserSync___.socket.on('LocateError', queries => {
  ws.send(queries)
})
