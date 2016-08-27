import fs from 'fs'
import babel from 'babel-core'
import React, { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'


class Render extends Component {
    render() {

        const head = Helmet.rewind()
        const attrs = head.htmlAttributes.toComponent()

            /*
            return (
                <html {...attrs}>
                    <Helmet title="My Title" />
                    <head></head>
                    <body>{ this.props.children }</body>
                </html>
            )
            */
            return (
            <div className="application">
                { head.title.toComponent() }
            </div>
        )
    }
}

let out = renderToStaticMarkup(<Render />)

console.log(out)
