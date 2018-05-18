const numberNames = require('../number-names');

describe('number names', () => {
  // ;[
  //   { in: 0, out: 'zero' },
  //   { in: 1, out: 'one' },
  //   { in: 5, out: 'five' },
  //   { in: 9, out: 'nine' },
  //   { in: 10, out: 'ten' },
  //   { in: 11, out: 'eleven' },
  //   { in: 16, out: 'sixteen' },
  //   { in: 22, out: 'twenty two' },
  //   { in: 68, out: 'sixty eight' },
  //   { in: 100, out: 'one hundred' },
  //   { in: 101, out: 'one hundred and one' },
  //   { in: 121, out: 'one hundred and twenty one' },
  //   { in: 1000, out: 'one thousand' },
  //   { in: 5678, out: 'five thousand, six hundred and seventy eight' },
  // ].forEach(testData => {
  //   it(`outputs "${testData.out}" when input is ${testData.in}`, () => {
  //     expect(numberNames.numberNames(testData.in)).toEqual(testData.out)
  //   })
  // })
  describe('getting number groups', () => {
    it('should return 1 if given 1 array', () => {
      expect(numberNames.getNumberGroups(1).length).toBe(1)
    })
    it('should return 1 if given hundred arrays', () => {
      expect(numberNames.getNumberGroups(100).length).toBe(1)
    })
    it('should return 2 arrays if given 1000 arrays', () => {
      expect(numberNames.getNumberGroups(1000).length).toBe(2)
    })
    it('should return 2 arrays if given 100000 arrays', () => {
      expect(numberNames.getNumberGroups(100000).length).toBe(2)
    })
    it('should return 3 arrays if given 1000000 arrays', () => {
      expect(numberNames.getNumberGroups(1000000).length).toBe(3)
    })
    it('should chunk from right and reverse', () => {
      expect(numberNames.getNumberGroups(1100000)).toEqual(['000', '100', '1'])
    })
  })
  describe('build number', () => {
    it('should return hundred', () => {
      expect(numberNames.buildNumber([1, 0, 0])).toMatch(/one hundred/)
    })
    it('should return hundred', () => {
      expect(numberNames.buildNumber([3, 0, 0])).toMatch(/three hundred/)
    })
    it('should return hundreds and tens twenty', () => {
      expect(numberNames.buildNumber([3, 2, 0])).toMatch(/three hundred/)
      expect(numberNames.buildNumber([3, 2, 0])).toMatch(/twenty/)
    })
    it('should return three hundred twenty one', () => {
      expect(numberNames.buildNumber([3, 2, 1])).toMatch(/three hundred/)
      expect(numberNames.buildNumber([3, 2, 1])).toMatch(/twenty/)
      expect(numberNames.buildNumber([3, 2, 1])).toMatch(/one/)
    })
    it('should return three AND twenty one', () => {
      expect(numberNames.buildNumber([3, 2, 1])).toBe('three hundred and twenty one')
    })
    it('should return empty string', () => {
      expect(numberNames.buildNumber([0, 0, 0])).toBe('')
    })
  })
  describe('build number with units', () => {
    it('should contain one million', () => {
      expect(numberNames.buildNumberWithUnits([['1'], ['000'], ['000']])).toMatch(/one/)
      expect(numberNames.buildNumberWithUnits([['1'], ['000'], ['000']])).toMatch(/million/)
    })
    it('should contain one million two hundred thousand and twenty', () => {
      const splitNumbers = [['1'], ['220'], ['000']]
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toMatch(/one/)
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toMatch(/million/)
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toMatch(/two/)
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toMatch(/hundred/)
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toMatch(/thousand/)
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toMatch(/and/)
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toMatch(/twenty/)
    })
    it('should number with commas in the right place', () => {
      const splitNumbers = [['1'], ['100'], ['010']]
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toBe(
        ' one million, one hundred thousand  and ten  ',
      )
    })
    it('should consider teens case 11', () => {
      const splitNumbers = [['1'], ['100'], ['011']]
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toBe(
        ' one million, one hundred thousand  and eleven  ',
      )
    })
    it('should consider teens case 19', () => {
      const splitNumbers = [['1'], ['100'], ['019']]
      expect(numberNames.buildNumberWithUnits(splitNumbers)).toBe(
        ' one million, one hundred thousand  and nineteen  ',
      )
    })
  })
  describe('teens', () => {
    it('returns if second index is not 1', () => {
      expect(numberNames.isTeenNumber([1, 2, 3])).toBe(false)
    })
    it('returns true if second index true', () => {
      expect(numberNames.isTeenNumber([1, 1, 3])).toBe(true)
    })
    it('should return false', () => {
      expect(numberNames.isTeenNumber([0, 1, 0])).toBe(false)
    })
  })
  describe('testing number names', () => {
    it('should return one million one thousand', () => {
      expect(numberNames.numberNames(1100000)).toBe(' one million, one hundred thousand')
    })
    it('should return one million only', () => {
      expect(numberNames.numberNames(1000000)).toBe(' one million')
    })
    it('should return one million and twenty', () => {
      expect(numberNames.numberNames(1000020)).toBe(' one million  and twenty  ')
    })
    it('should show negative id negavive number supplied', () => {
      expect(numberNames.numberNames(-1000020)).toMatch(/negative/)
    })
    it('should return only a thousand', () => {
      expect(numberNames.numberNames(1000)).toBe(' one thousand')
    })
    it('should return only one thousand and eleven', () => {
      expect(numberNames.numberNames(1011)).toBe(' one thousand  and eleven  ')
    })
    it('should return two only', () => {
      expect(numberNames.numberNames(2)).toBe(' two ')
    })
    it('should return one only', () => {
      expect(numberNames.numberNames(1)).toBe(' one ')
    })
  })
  describe('getting the unit', () => {
    it('should return million', () => {
      expect(numberNames.getUnit([['1'], ['100'], ['000']], 0)).toBe('million')
    })
    it('should return thousand', () => {
      expect(numberNames.getUnit([['1'], ['100'], ['000']], 1)).toBe('thousand')
    })
    it('should return empty string when thousands is zero', () => {
      expect(numberNames.getUnit([['1'], ['000'], ['000']], 1)).toBe('')
    })
  })
})
