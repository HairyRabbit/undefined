// -*- mode: react -*-
import Elm from 'react-elm-components'
import React, { Component } from 'react'
import $ from 'jquery'
import { render } from 'react-dom'
import Snippets from 'Snippets/Main.elm'
import Slider from 'Slider/index.jsx'
import SliderPort from 'Slider/port.js'


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

  SliderPort(ports)
}

/**
render(
  <App />,
  document.getElementById('main')
)


   ___browserSync___.socket.emit('test', 2333)

   var ws = new WebSocket('ws://localhost:9999')
   ws.send('233')

var ws = new WebSocket('ws://localhost:9999')
___browserSync___.socket.on('LocateError', queries => {
  ws.send(queries)
})


require.ensure('test2.js', function() {

	let test = require('test2.js')
	console.log(test)
})
*/




/*
   type Date = [1...31]
   type Month = [1...12]
 */

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getDateCountInMonth(isLeapYear, mm) {
  switch(mm + 1) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31
    case 2:
      return isLeapYear ? 29 : 28
    default:
      return 30
  }
}


// fx :: Date -> Timestamp
function computMsAsDay(day) {
  return 24 * 60 * 60 * 1000 * day
}

function getDateObjFromTimestamp(timestamp) {
  return new Date(timestamp)
}

function getDateFromDateObj(dateObj) {
  return dateObj.getDate()
}

function getYearFromDateObj(dateObj) {
  return dateObj.getFullYear()
}

function getMonthFromDateObj(dateObj) {
  return dateObj.getMonth()
}

function getWeekFromDateObj(dateObj) {
  return dateObj.getDay()
}

function divideInt(a, b) {
  return parseInt(a / b)
}


/*
function sameWeekDates(a, b) {
  b - divideInt(b / 7) * 7
}
*/



function normalizeWeek(week) {
  return week === 0 ? 6 : week - 1
}



// fx :: Timestamp -> Date -> Timestamp
function computFirstDateInMonth(target, curr) {
  return target - computMsAsDay(curr - 1)
}
function computLastDateInMonth(target, sum, curr) {
  return target + computMsAsDay(sum - curr)
}

function prepend() {

}

function constCurrentMonthDates(count) {
  return new Array(count)
}

function constArray(len) {
  let out = []
  for(let i = 0; i < len; i++) out.push(i)
  return out
}

function penpendArray(array, len) {
  let out = []
  for(let i = 0, j = 0; i < len; i++, j--) out.push(j - 1)
  return out.reverse().concat(array)
}

function appendArray(array, start, len) {
  let out = []
  for(let i = 0, j = start + 1; i < len; i++, j++) out.push(j)
  return array.concat(out)
}


function renderHeader() {
  return ['日', '一', '二', '三', '四', '五', '六',].join('  ')
}

function formatData(matcher, date) {
  let str = date.toISOString()
  let dateStr = str.substr(0, str.indexOf('T')).split('-')
  if(matcher === 'dd') return dateStr[2]
  return dateStr.join('-')
}


function renderBody(array) {
  let len = array.length
  let out = Array(len)
  for(let i = 0; i < len; i++) {
    let cur = array[i]
    let str = formatData('dd', cur)
    out[i] = (i + 1) % 7 !== 0 ? str + '  ' : str + '\n'
  }
  return out.join('')
}

function renderView(array) {
  let header = renderHeader()
  let body   = renderBody(array)
  return [header, body].join('\n')
}

function main(start) {
  let dateObj = getDateObjFromTimestamp(start)
  let dd = getDateFromDateObj(dateObj)
  let firstDateInMonth = getDateObjFromTimestamp(computFirstDateInMonth(start, dd))
  let yy = getYearFromDateObj(dateObj)
  let mm = getMonthFromDateObj(dateObj)
  let dateCount = getDateCountInMonth(isLeapYear(yy), mm)
  let lastDateInMonth = getDateObjFromTimestamp(computLastDateInMonth(start, dateCount, dd))
  let firstWeek = normalizeWeek(getWeekFromDateObj(firstDateInMonth)) + 1

  let currArray = constArray(dateCount)
  let prevArray = penpendArray(constArray(dateCount), firstWeek)
  let nextArray = appendArray(prevArray, prevArray[prevArray.length - 1], 6 * 7 - dateCount - firstWeek)

  let calendar = nextArray.map(n => getDateObjFromTimestamp(computFirstDateInMonth(start, dd) + computMsAsDay(n)))



  console.log(
    //nextArray,
    //nextArray.map(n => getDateObjFromTimestamp(computFirstDateInMonth(start, dd) + computMsAsDay(n)).getDate()),
    //firstDateInMonth,
    //nextArray.map(n => computMsAsDay(n)),
    //getDateObjFromTimestamp(firstDateInMonth - computMsAsDay(firstWeek))
    renderView(calendar)
  )
}

main(1475205920779) //Date.now()


import 'runtime/function/partial'
