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

export default number => {
  if (number === 0) return 'zero'

  let isNegative = number < 0 ? true : false;

  const groupedNumbers = getNumberGroups(Math.abs(number))
  let word = ''
  word += isNegative ? 'negative' : '';
  word += buildNumberWithUnits(groupedNumbers.reverse())

  return word
}

export const getFirstUnitIndex = numArray => {
  switch (numArray.length) {
    case 2:
      return 0
    case 3:
      return 1
    case 4:
      return 2
    default:
      return -1
  }
}

export const buildNumberWithUnits = numArray => {
  let word = ''
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
    groupedNumbers.push(splitNumbers.splice(-3, 3))
  }

  groupedNumbers = groupedNumbers.map(groupedNumber => groupedNumber.join(''))

  return groupedNumbers
}
