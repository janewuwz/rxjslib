import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import interval from '../filter';


describe('Filter', function(){
  it('should pass filter case', function(done) {
    const expected = [1, 3];
    const subscription = Rx.Observable.from([1,2,3]).filter((x: number) => x !== 2).subscribe({
      next: (x: any) => expect(x).to.equal(expected.shift()),
      error: () => done('error should not be called'),
      complete: () => {},
    });
    setTimeout(function () {
      subscription.unsubscribe();
      expect(expected.length).to.equal(0)
      done();
    }, 550);
  });
})





