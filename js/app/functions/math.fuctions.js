const getMaxPrice = result =>
  Object.keys(result)
    .map(key => result[key].price)
    .reduce((a, b) => (a < b ? b : a))

let invalidEntries = 0

const isNumber = obj => {
  return obj !== undefined && typeof obj === 'number' && !isNaN(obj)
}

const filterOutCrap = x => {
  if (isNumber(x)) {
    return true
  }
  invalidEntries++
  return false
}

const getTotalPrice = result =>
  Object.keys(result)
    .map(key => result[key].price)
    .filter(filterOutCrap)
    .reduce((a, b) => a + b, 0)

export { getMaxPrice, getTotalPrice }
