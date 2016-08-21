jest.unmock('../RabbitForwardFindFile.js')
jest.unmock('ramda')
jest.unmock('ramda-fantasy')
jest.unmock('del')


import path from 'path'
import fs from 'fs'
import del from 'del'
import { Maybe } from 'ramda-fantasy'
import forwardSearchFilePath, {
  relativePathDepth,
  forwardPath,
  currentDirFile,
  isRootPath
} from '../RabbitForwardFindFile.js'


const { Just, Nothing } = Maybe

describe('relativePathDepth', () => {
  it('will be curr path.', () => {
    expect(relativePathDepth(1)).toBe('../')
  })

  it('will be prev dir path.', () => {
    expect(relativePathDepth(2)).toBe('../../')
  })

  it('will be null string.', () => {
    expect(relativePathDepth(0)).toBe('')
  })
})


describe('Replace Path', () => {
  let filename = 'test.foo'
  let filepath = path.normalize('path/some/to/test.bar')

  it('replace filename with current path.', () => {
    expect(currentDirFile(filename, filepath))
      .toBe(path.normalize('path/some/to/test.foo'))
  })

  it('replace dir path as some filename on one depth', () => {
    expect(forwardPath(filename, filepath))
      .toBe(path.normalize('path/some/test.foo'))
  })
})


describe('Root Path', () => {
  let root = 'root/path/to/'

  it('it will be the same path depth', () => {
    expect(isRootPath(root, 'root/path/to/test.foo'))
      .toBe(true)
  })
})


describe('Forward Search File', () => {
  let filename = 'test'
  let root = path.join(__dirname, 'example1')
  del.sync(root)
  fs.mkdirSync(root)
  fs.mkdirSync(`${root}/path`)
  fs.mkdirSync(`${root}/path/from`)
  fs.mkdirSync(`${root}/path/from/to`)
  fs.writeFileSync(`${root}/${filename}`)
  fs.writeFileSync(`${root}/path/${filename}`)
  fs.writeFileSync(`${root}/path/from/${filename}`)
  fs.writeFileSync(`${root}/path/from/to/${filename}`)

  it('file exist at currt path', () => {

    let testPath = `${root}/path/from/to/${filename}`
    let equalsPath = testPath

    expect(
      forwardSearchFilePath(filename, root, testPath)
        .equals(
          Just(path.normalize(equalsPath))
        )
    ).toBe(true)
  })


  it('file exist at up one level path', () => {

    let testPath = `${root}/path/from/to/${filename}`
    let equalsPath = `${root}/path/from/${filename}`

    del.sync(testPath)

    expect(
      forwardSearchFilePath(filename, root, testPath)
        .equals(
          Just(path.normalize(equalsPath))
        )
    ).toBe(true)

  })


  it('file find on root path', () => {

    let testPath = `${root}/path/from/to/${filename}`
    let equalsPath = `${root}/${filename}`

    del.sync(`${root}/path/from/to/${filename}`)
    del.sync(`${root}/path/from/${filename}`)
    del.sync(`${root}/path/${filename}`)

    expect(
      forwardSearchFilePath(filename, root, testPath)
        .equals(
          Just(path.normalize(equalsPath))
        )
    ).toBe(true)

  })


  it('file can\'t find on root path', () => {

    let testPath = `${root}/path/from/to/${filename}`
    let equalsPath = `${root}/${filename}`

    del.sync(`${root}/path/from/to/${filename}`)
    del.sync(`${root}/path/from/${filename}`)
    del.sync(`${root}/path/${filename}`)
    del.sync(`${root}/${filename}`)

    expect(
      forwardSearchFilePath(filename, root, testPath)
        .equals(
          Nothing()
        )
    ).toBe(true)

    del.sync(root)
  })
})
