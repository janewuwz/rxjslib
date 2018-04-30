const assert = require('assert')
const helloWorld = require('../index')

describe('helloWorld', () => {
  describe('#init()', () => {
    it('should return hello world', () => {
      assert.equal(helloWorld.init(), 'hello world')
    })
  })
})
