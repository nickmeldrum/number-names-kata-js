const numberNames = require('./index')

describe('number names', () => {
  ;[
    { in: 0, out: 'zero' },
    { in: 1, out: 'one' },
    { in: 5, out: 'five' },
    { in: 9, out: 'nine' },
    { in: 10, out: 'ten' },
    { in: 11, out: 'eleven' },
    { in: 16, out: 'sixteen' },
    { in: 22, out: 'twenty two' },
    { in: 68, out: 'sixty eight' },
    { in: 100, out: 'one hundred' },
    { in: 101, out: 'one hundred and one' },
    { in: 121, out: 'one hundred and twenty one' },
    { in: 1000, out: 'one thousand' },
    { in: 5678, out: 'five thousand, six hundred and seventy eight' },
  ].forEach(testData => {
    it(`outputs "${testData.out}" when input is ${testData.in}`, () => {
      expect(numberNames(testData.in)).toEqual(testData.out)
    })
  })
})
