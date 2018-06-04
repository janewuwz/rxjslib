import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import zip from '../zip';

/**
 * -----0-----1-----2-----3-----4|
 * 
 * ----0----1----2----3|
 * 
 * -----0-----2-----4-----6
 */
describe('Zip', function(){
  it('should pass zip case', function(done) {
    const expected = [0, 2, 4, 6];

    var foo = Rx.Observable.interval(50).take(5)
    var bar = Rx.Observable.interval(40).take(4)
    var combined = foo.zip(bar, (x: number, y: number) => x+y)

    const subscription = combined.subscribe({
      next: (x: any) => {
        expect(x).to.equal(expected.shift())
      },
      error: () => done('error should not be called'),
      complete: () => {done()},
    });
    setTimeout(function () {
      expect(expected.length).to.equal(0)
      done();
    }, 2000);
  });
})





