const numberNames = require('./index')

describe('number names', () => {
  it('outputs "one" when input is 1', () => {
    expect(numberNames(1)).toEqual('one')
  })
})
