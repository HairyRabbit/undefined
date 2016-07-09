import Elm from 'react-elm-components'
import React from 'react'
import { render } from 'react-dom'
import Snippets from 'Snippets/Main.elm'

render(
    <Elm src={Snippets.Main} />,
    document.getElementById('main')
)
