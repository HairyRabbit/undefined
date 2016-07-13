import Elm from 'react-elm-components'
import React, { Component } from 'react'
import $ from 'jquery'
import { render } from 'react-dom'
import Snippets from 'Snippets/Main.elm'

import Slider from 'components/Slider/index.jsx'


class App extends Component {
    render() {
	return (
	  <div>
	    <Elm src={Snippets.Main} />
	    <Slider />
	  </div>
	)
    }
}


render(
    <App />,
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

