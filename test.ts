import 'mocha';
import helloWorld from './index';
import { expect } from 'chai';

describe('helloWorld', () => {
  describe('#init()', () => {
    it('should return hello world', () => {
      expect(helloWorld.init()).to.equal('hello world')
    })
  })
})
