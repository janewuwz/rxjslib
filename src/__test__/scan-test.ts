import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import scan from '../scan';


describe('Scan', function(){
  it('should pass scan case', function(done) {
    const expected = [0, 1, 3, 6];

    var foo = Rx.Observable.interval(200).take(4)

    const subscription = foo.scan(0, (r: any, a: any) => r+a).subscribe({
      next: (x: any) => {
        expect(x).to.equal(expected.shift())
      },
      error: () => done('error should not be called'),
      complete: () => {},
    });
    setTimeout(function () {
      expect(expected.length).to.equal(0)
      done();
    }, 1000);
  });
})





