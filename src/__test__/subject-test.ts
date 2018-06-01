import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import interval from '../interval';


describe('Subject', function() {
  it('should broadcast values to many observers', function(done) {
    const subject = new Rx.Subject();
    const expected = ['foo', 'bar'];

    let i = 0;
    let j = 0;

    subject.subscribe({
      next: (x: any) => {
        expect(x).to.equal(expected[i++]);
      },
      error: (e: any) => done(e),
      complete: () => {},
    });

    subject.subscribe({
      next: (x: any) => {
        expect(x).to.equal(expected[j++]);
      },
      error: (e: any) => done(e),
      complete: done
    });
    subject.next('foo');
    subject.next('bar');
    subject.complete();
  });
});






