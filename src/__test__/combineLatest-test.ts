import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import interval from '../interval';

describe('CombineLatest', function() {
  it('should work with from observable and interval observable', function(done) {
    const expected = ['b0', 'b1', 'b2', 'b3', 'b4'];

    const a$ = Rx.Observable.from(['a', 'b']);
    const b$ = Rx.Observable.interval(100);

    const subscription = a$.combineLatest(b$, (a: any, b: any) => a+b)
      .subscribe({
        next: (x: any) => {
          expect(x).to.equal(expected.shift())
        },
        error: () => done('error should not be called'),
        complete: () => {},
      });

    setTimeout(function () {
      subscription.unsubscribe();
      expect(expected.length).to.equal(0);
      done();
    }, 550);
  });
});



