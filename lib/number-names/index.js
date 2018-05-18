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

/**
 * This converts a number to an English word
 * @param number
 * @returns {string}
 */
export default number => {
  if (number === 0) return 'zero'

  // check if the number is negative
  const isNegative = number < 0

  // we use Math.abs here so we only pass the absolute value
  const groupedNumbers = getNumberGroups(Math.abs(number))
  let word = ''

  // add negative to word if negative number
  word += isNegative ? 'negative' : ''
  word += buildNumberWithUnits(groupedNumbers.reverse())

  return word
}

/**
 * This builds our number with the big units [thousand, million, billion]
 * @param numArray
 * @returns {string}
 */
export const buildNumberWithUnits = numArray => {
  let word = ''

  // here we take each array portion and run it though build number
  numArray.forEach((portion, i) => {
    const string = buildNumber(portion.toString().split(''))
    if (string.trim()) {
      // if not first item precede with comma
      // and not last item
      if (i !== 0 && numArray.length - 1 !== i) {
        word += ','
      }
      // add to words
      word += ` ${string} `

      // get unit
      word += `${getUnit(numArray, i)}`
    }
  })
  return word
}

/**
 * Returns the numbers unit
 * @param numArray
 * @param currentIndex
 * @returns {string}
 */
export const getUnit = (numArray, currentIndex) => {
  // if zero just return empty
  if (Number(numArray[currentIndex]) === 0) {
    return ''
  }
  let initialIndex
  switch (numArray.length) {
    case 4:
      initialIndex = 2
      break
    case 3:
      initialIndex = 1
      break
    case 2:
      initialIndex = 0
      break
    default:
      initialIndex = 1
  }

  // if first item
  if (currentIndex === 0) {
    return units[initialIndex]
  }

  // if undefined
  if (!units[initialIndex - currentIndex]) {
    return ''
  }

  return units[initialIndex - currentIndex]
}

export const buildNumber = numArray => {
  let word = ''

  /*
        if hundreds number exists and is not 0
        add the number plus hundred to the word
     */
  if (numArray.length === 3 && Number(numArray[0]) !== 0) {
    word += `${ones[Number(numArray[0]) - 1]} hundred`
  }

  // check if teen
  if (!isTeenNumber(numArray)) {
    if (numArray.length >= 2 && Number(numArray[1]) !== 0) {
      word += ` and ${tens[Number(numArray[1] - 1)]} `
    }
    // sort out singles
    if (
      numArray[numArray.length - 1] &&
      Number(numArray[numArray.length - 1]) !== 0
    ) {
      word += ones[numArray[numArray.length - 1] - 1]
    }
  } else {
    word += ` and ${teens[Number(numArray[2] - 1)]} `
  }

  return word
}

export const isTeenNumber = numArray => {
  // we check if second index exists and equals 1 and is not 10
  if (
    numArray[1] &&
    Number(numArray[1]) === 1 &&
    Number(`${numArray[1]}${numArray[2]}`) !== 10
  ) {
    return true
  }
  return false
}

export const getNumberGroups = num => {
  const splitNumbers = num.toString().split('')
  let groupedNumbers = []

  while (splitNumbers.length > 0) {
    // this is used to splice array from the back
    groupedNumbers.push(splitNumbers.splice(-3, 3))
  }

  groupedNumbers = groupedNumbers.map(groupedNumber => groupedNumber.join(''))

  return groupedNumbers
}
