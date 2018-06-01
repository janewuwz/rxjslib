import 'mocha';
import Rx from '../index';
import { expect } from 'chai';
import interval from '../interval';


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




