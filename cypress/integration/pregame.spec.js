
describe('My first passing test', function() {
    it('Does not do much!', function() {
        expect(true).to.equal(true);
    })
})

describe('My first failing test', function() {
    it('Does not do much!', function() {
      expect(true).to.equal(false)
    })
  })