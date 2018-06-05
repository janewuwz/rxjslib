import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import multicast from '../multicast';


describe('Multicast', function() {
  it('should pump values to multiple observers', function(done) {
    const observable = Rx.Observable
      .from(['foo', 'bar'])
      .multicast(new Rx.Subject());

    const expected = ['foo', 'bar'];

    let i = 0;
    let j = 0;

    observable.subscribe({
      next: (x: any) => {
        expect(x).to.equal(expected[i++])
      },
      error: (e: any) => done(e),
      complete: done
    });

    observable.subscribe({
      next: (x: any) => {
        expect(x).to.equal(expected[j++])
      },
      error: (e: any) => done(e),
      complete: () => {}
    });

    observable.connect();
  });
});
