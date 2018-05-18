import numberNames, {
  getFirstUnitIndex,
  getNumberGroups,
  buildNumber,
  buildNumberWithUnits,
  isTeenNumber,
} from './index'

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
      expect(getNumberGroups(1).length).toBe(1)
    })
    it('should return 1 if given hundred arrays', () => {
      expect(getNumberGroups(100).length).toBe(1)
    })
    it('should return 2 arrays if given 1000 arrays', () => {
      expect(getNumberGroups(1000).length).toBe(2)
    })
    it('should return 2 arrays if given 100000 arrays', () => {
      expect(getNumberGroups(100000).length).toBe(2)
    })
    it('should return 3 arrays if given 1000000 arrays', () => {
      expect(getNumberGroups(1000000).length).toBe(3)
    })
    it('should chunk from right', () => {
        getNumberGroups(1100000)
      // expect(getNumberGroups(1100000)).toBe([['1'], ['100'], ['000']])
    })
  })
  describe('build number', () => {
    it('should return hundred', () => {
      expect(buildNumber([1, 0, 0])).toMatch(/one hundred/)
    })
    it('should return hundred', () => {
      expect(buildNumber([3, 0, 0])).toMatch(/three hundred/)
    })
    it('should return hundreds and tens ten', () => {
      buildNumber([3, 1, 0])
      // expect(buildNumber([3,1,0])).toMatch(/three hundred/)
      // expect(buildNumber([3,1,0])).toMatch(/ten/)
    })
    it('should return hundreds and tens twenty', () => {
      expect(buildNumber([3, 2, 0])).toMatch(/three hundred/)
      expect(buildNumber([3, 2, 0])).toMatch(/twenty/)
    })
    it('should return three hundred twenty one', () => {
      expect(buildNumber([3, 2, 1])).toMatch(/three hundred/)
      expect(buildNumber([3, 2, 1])).toMatch(/twenty/)
      expect(buildNumber([3, 2, 1])).toMatch(/one/)
    })
    it('should return three AND twenty one', () => {
      expect(buildNumber([3, 2, 1])).toBe('three hundred and twenty one')
    })
    it('should return empty string', () => {
      expect(buildNumber([0, 0, 0])).toBe('')
    })
  })
  describe('build number with units', () => {
    it('should contain one million', () => {
      expect(buildNumberWithUnits([['1'], ['000'], ['000']])).toMatch(/one/)
      expect(buildNumberWithUnits([['1'], ['000'], ['000']])).toMatch(/million/)
    })
    it('should contain one million two hundred thousand and twenty', () => {
      const splitNumbers = [['1'], ['220'], ['000']]
      expect(buildNumberWithUnits(splitNumbers)).toMatch(/one/)
      expect(buildNumberWithUnits(splitNumbers)).toMatch(/million/)
      expect(buildNumberWithUnits(splitNumbers)).toMatch(/two/)
      expect(buildNumberWithUnits(splitNumbers)).toMatch(/hundred/)
      expect(buildNumberWithUnits(splitNumbers)).toMatch(/thousand/)
      expect(buildNumberWithUnits(splitNumbers)).toMatch(/and/)
      expect(buildNumberWithUnits(splitNumbers)).toMatch(/twenty/)
    })
    it('should number with commas in the right place', () => {
      const splitNumbers = [['1'], ['100'], ['010']]
      expect(buildNumberWithUnits(splitNumbers)).toBe(
        ' one million, one hundred thousand  and ten  ',
      )
    })
    it('should consider teens case 11', () => {
      const splitNumbers = [['1'], ['100'], ['011']]
      expect(buildNumberWithUnits(splitNumbers)).toBe(
        ' one million, one hundred thousand  and eleven  ',
      )
    })
    it('should consider teens case 19', () => {
      const splitNumbers = [['1'], ['100'], ['019']]
      expect(buildNumberWithUnits(splitNumbers)).toBe(
        ' one million, one hundred thousand  and nineteen  ',
      )
    })
  })
  describe('get first unit index', () => {
    it('should return 0', () => {
      expect(getFirstUnitIndex([[], []])).toBe(0)
    })
    it('should return 1', () => {
      expect(getFirstUnitIndex([[], [], []])).toBe(1)
    })
    it('should return 2', () => {
      expect(getFirstUnitIndex([[], [], [], []])).toBe(2)
    })
  })
  describe('teens', () => {
    it('returns if second index is not 1', () => {
      expect(isTeenNumber([1, 2, 3])).toBe(false)
    })
    it('returns true if second index true', () => {
      expect(isTeenNumber([1, 1, 3])).toBe(true)
    })
    it('should return false', () => {
      expect(isTeenNumber([0, 1, 0])).toBe(false)
    })
  })
  describe('testing number names', () => {
    it('should return one million one thousand', () => {
      console.log(numberNames(1100000))
    })
  })
})
