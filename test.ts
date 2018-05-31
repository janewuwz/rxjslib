import 'mocha';
import Rx from './src/index';
import { expect } from 'chai';
import interval from './src/interval';


describe('Observable', function(){
  it('should support basic Observable use case', function(done) {
    var observable = Rx.Observable.create(function subscribe(observer: any) {
      try {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
        observer.next(4);
      } catch (err) {
        observer.error(err); 
      }
    });
    observable.subscribe({
      next: (x: any) => console.log('got value ' + x),
      error: (err: any) => {
        // fix mocha done() invoked with non-Error: done and exceed time
        setTimeout(() => {
          done('something wrong occurred: ' + err)
        }, 0)
      },
      complete: () => {
        setTimeout(() => {
          done()
        }, 0);
      },
    });
  });

  it('should dispose complete', function(done) {
    const expectedProducer = [0, 1, 2];
    const expectedConsumer = [0, 1, 2];
    Rx.Observable.create(function subscribe(observer: any) {
      let i = 0;
      const timeout = setInterval(() => {
        expect(i).to.equal(expectedProducer.shift());
        observer.next(i);
        i+=1;
      }, 30);
      return new Rx.Subscription(function unsubscribe(){
        clearInterval(timeout)
      });
    })
    .take(3)
    .subscribe({
      next: (x: any)=> {
        expect(x).to.equal(expectedConsumer.shift())
      },
      error: () => done('error should not be called'),
      complete: () => {
        expect(expectedProducer.length).to.equal(0);
        expect(expectedConsumer.length).to.equal(0);
        setTimeout(() => {
          done();
        }, 200);
      },
    })
  });

  it('shoud dispose on error', function(done) {
    const expectedProducer = [0, 1, 2];
    const expectedConsumer = [0, 1, 2];
    Rx.Observable.create(function subscribe(observer: any) {
      let i = 0;
      const timeout = setInterval(() => {
        expect(i).to.equal(expectedProducer.shift())
        observer.next(i);
        i+=1;
        if (i===3) {
          observer.error(new Error(':('));
        }
      }, 30);
      return new Rx.Subscription(function unsubscribe(){
        clearInterval(timeout);
      });
    })
    .subscribe({
      next: (x: any) => expect(x).to.equal(expectedConsumer.shift()),
      error: (e: any) => {
        expect(e.message).to.equal(':(');
        expect(expectedProducer.length).to.equal(0);
        expect(expectedConsumer.length).to.equal(0);
        setTimeout(() => {
          done();
        }, 200);
      },
      complete: () => done('complete should not be called'),
    });
  });
})


// describe('combineLatest', function() {
//   it('should work with from observable and interval observable', function(done) {
//     const expected = ['b0', 'b1', 'b2', 'b3', 'b4'];

//     const a$ = Rx.Observable.from(['a', 'b']);
//     const b$ = Rx.Observable.interval(100);

//     const subscription = a$.combineLatest(b$, (a: any, b: any) => a+b)
//       .subscribe({
//         next: (x: any) => expect(x).to.equal(expected.shift()),
//         error: () => done('error should not be called'),
//         complete: () => {},
//       });

//     setTimeout(function () {
//       subscription.unsubscribe();
//       expect(expected.length).to.equal(0);
//       done();
//     }, 550);
//   });
// });



describe('Interval', function(){
  it('should pass basic interval case', function(done) {
    const expected = [0, 1, 2, 3, 4];
    const subscription = Rx.Observable.interval(100).subscribe({
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
})



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



