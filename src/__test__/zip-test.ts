import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import zip from '../zip';


describe('Zip', function(){
  it('should pass zip case', function(done) {
    const expected = [0, 2, 4, 6];

    var foo = Rx.Observable.interval(500).take(5)
    var bar = Rx.Observable.interval(400).take(4)
    var combined = foo.zip(bar, (x: number, y: number) => x+y)

    const subscription = combined.subscribe({
      next: (x: any) => {
        console.log(x)
        // expect(x).to.equal(expected.shift())
      },
      error: () => done('error should not be called'),
      complete: () => {done()},
    });
    // setTimeout(function () {
    //   subscription.unsubscribe();
    //   expect(expected.length).to.equal(0)
    //   done();
    // }, 2700);
  });
})





