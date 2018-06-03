import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import concat from '../concat';


describe('Concat', function(){
  it('should pass concat case', function(done) {
    const expected: any = [0, 1, 2, 3, 4, 5]

    var foo  = Rx.Observable.interval(100).take(3)
    var bar = Rx.Observable.of(3,4,5)
    var baz =  Rx.Observable.concat(foo, bar)

    const subscription = baz.subscribe({
      next: (x: any) => {
        expect(x).to.equal(expected.shift())
      },
      error: () => done('error should not be called'),
      complete: () => {},
    })

    setTimeout(function () {
      subscription.unsubscribe();
      expect(expected.length).to.equal(0)
      done();
    }, 550);
  });
})





