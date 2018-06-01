import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import interval from '../interval';


describe('Interval', function(){
  it('should pass basic interval case', function(done) {
    const expected = [0, 1, 2, 3, 4];
    const subscription = Rx.Observable.interval(100).subscribe({
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





