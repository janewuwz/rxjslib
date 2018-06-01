import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import interval from '../interval';


describe('Merge', function() {
  it('should work with Observable.interval', function(done) {
    const expected = [0, 1, 2, 0, 3, 4];

    const a$ = Rx.Observable.interval(100);
    const b$ = Rx.Observable.interval(350);

    const subscription = Rx.Observable.merge(a$, b$).subscribe({
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
});



