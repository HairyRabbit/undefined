function renderHeader() {
  return ['日', '一', '二', '三', '四', '五', '六'].join('  ')
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

import { toDate } from 'runtime/date/stamp'

export function consoleView(calendar): string {
  let dataCalendar = calendar.map(toDate),
      len = dataCalendar.length,
      out = Array(len)

  for(let i = 0; i < len; i++) {
    let cur = dataCalendar[i],
        str = formatData('dd', cur)
    out[i] = (i + 1) % 7 !== 0 ? str + '  ' : str + '\n'
  }

  return out.join('')
}
