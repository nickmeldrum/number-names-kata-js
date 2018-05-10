const ones = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const teens = [
  'eleven',
  'twelve',
  'thirteen',
  'forteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
]
const tens = [
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
]
const units = ['thousand', 'million', 'billion']

module.exports = number => {
  if (number === 0) return 'zero'

  let outputBuilder = ''
  const numberUnits = number.toString().split('')

  const thousandsNumber = ones[numberUnits[numberUnits.length - 4] - 1]
  const hundredsNumber = ones[numberUnits[numberUnits.length - 3] - 1]
  const tensNumber = tens[numberUnits[numberUnits.length - 2] - 1]
  const onesNumber = ones[numberUnits[numberUnits.length - 1] - 1]

  if (thousandsNumber) {
    outputBuilder += `${thousandsNumber} ${units[0]}`
  }
  if (thousandsNumber && (hundredsNumber || tensNumber || onesNumber)) {
    outputBuilder += ', '
  }
  if (hundredsNumber) {
    outputBuilder += `${hundredsNumber} hundred`
  }
  if (hundredsNumber && (tensNumber || onesNumber)) {
    outputBuilder += ' and '
  }
  if (
    numberUnits[numberUnits.length - 2] === '1' &&
    numberUnits[numberUnits.length - 1] > '0'
  ) {
    outputBuilder += teens[numberUnits[numberUnits.length - 1] - 1]
  } else {
    if (tensNumber) {
      outputBuilder += tensNumber
    }
    if (tensNumber && onesNumber) {
      outputBuilder += ' '
    }
    if (onesNumber) {
      outputBuilder += onesNumber
    }
  }

  return outputBuilder
}
