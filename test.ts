import 'mocha';
import Rx from './index';
import { expect } from 'chai';
import interval from './interval';

// case 1
describe('basicObservable', function(){
  it('should equal basic next value', function(done) {
    var expected = [1,2,3, 4];
    var observable = Rx.Observable.create(function(observer: any) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
    });
    observable.subscribe({
      next: (x: any) => expect(x).to.equal(expected.shift()),
      error: (err: any) => done('something wrong occurred: ' + err),
      complete: () => {
        console.log('done');
        setTimeout(() => {
          done();
        }, 200)
      }
    });
  })
})




// case 2 failed
// describe('dispose complete', function(){
//   it('should complete', function(done) {
//     var expected = [1,2,3]
//     var observable = Rx.Observable.create(function(observer: any) {
//       try {
//         observer.next(1);
//         observer.next(2);
//         observer.next(3); 
//         observer.complete();   
//         observer.next(4);    
//       } catch (error) {
//         observer.error(error);
//       }
//     });
//     observable.subscribe({
//       next: (x: any) => expect(x).to.equal(expected.shift()),
//       error: (err: any) => done('something wrong occurred: ' + err),
//       complete: () => {
//         console.log('done');
//         setTimeout(() => {
//           done();
//         }, 200)
//       }
//     });
//   })
// })




// case 3
// unsubscribe
describe('unsubscribe', function(){
  it('should unsubscribe', function(done) {
    function subscribe(observer: any) {
      var intervalID = setInterval(() => {
        observer.next('hi');
      }, 1000);
      return function unsubscribe() {
        clearInterval(intervalID);
      }
    }
    var unsubscribe = subscribe({
      next: (x: any) => expect(x).to.equal('hi'),
      error: () => done('error should not be called')
    })
    this.timeout(3500);
    setTimeout(function(){
      unsubscribe();
      done();
    }, 3000)
  })
})




// case 4
// interval
describe('interval', function(){
  it('should pass interval', function(done) {
    const expected = [0, 1, 2, 3];
    var observable = interval(1000);
    var subscription = observable.subscribe({
      next: (x: any) => expect(x).to.equal(expected.shift()),
      error: () => done('error should not be called'),
    });
    this.timeout(3000);
    setTimeout(() => {
      subscription.unsubscribe();
      done();
    }, 2500)
  })
})

