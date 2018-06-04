import Rx from '../index'
import interval from '../interval'
import { expect } from 'chai';
import 'mocha';

/**
 * -------------0-------------1
 * ---0---1---2---3---4
 * 
 * ---0---1---2-----0---1---2---3---4
 */
describe('SwitchMap', function() {
  it('should map values to concurrent Observables, and switch', function(done) {
    const expected = [0, 1, 2, 0, 1, 2, 3, 4];
     Rx.Observable.interval(100)
      .take(2)
      .switchMap(() => Rx.Observable.interval(30).take(5))
      .subscribe({
        next: (x: any) => {
          expect(x).to.equal(expected.shift())
        },
        error: () => done('error should not be called'),

        complete: () => {
          expect(expected.length).to.equal(0)
          done();
        }
      });
  });
});
