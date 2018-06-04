import Rx from '../index'
import interval from '../interval'
import { expect } from 'chai';
import 'mocha';

/**
 * ---0---1 |
 * ab
 * 
 * ---ab--ab
 */
describe('mergeMap', function() {
  it('should map a value to an Observable, and merge', function(done) {
    const expected = ['a0', 'b0', 'a1', 'b1'];
    Rx.Observable.interval(100)
      .take(2)
      .mergeMap((x: any) =>
        Rx.Observable.from(['a', 'b'])
          .map((y:any) => y + x)
      )
      .subscribe({
        next: (x: any )=> {
          expect(x).to.equal(expected.shift())
        },
        error: () => done('error should not be called'),
        complete: () => {
          expect(expected.length).to.equal(0)
          done();
        }
      });
  });

/**
 * -------------0-------------1
 * 
 * ---0---1---2---3---4
 * 
 * ---0---1---2---30--41---2---3---4
 */
  it('should map values to concurrent Observables, and merge', function(done) {
    const expected = [0, 1, 2, 3, 0, 4, 1, 2, 3, 4];
    Rx.Observable.interval(100)
      .take(2)
      .mergeMap(() => Rx.Observable.interval(30).take(5))
      .subscribe({
        next: (x: any) => {
          expect(x).to.equal(expected.shift())
        },
        error: () => done('error should not be called'),
        complete: () => {
          expect(expected.length).to.equal(0);
          done();
        }
      });
  });
});
