/**
 * Rabbit/Runtime Help
 */

function objectToString(value) {
  // Object.prototype
  return toString.call(value)
}

function isObjectFlag(flag, value) {
  return objectToString(value) === flag
}

export isObjectFlag
