import 'mocha';
import Rx from './src/index';
import { expect } from 'chai';
import interval from './src/interval';

// case 1
// describe('basicObservable', function(){
//   it('should equal basic next value', function(done) {
//     var expected = [1,2,3, 4];
//     var observable = Rx.Observable.create(function(observer: any) {
//       observer.next(1);
//       observer.next(2);
//       observer.next(3);
//       setTimeout(() => {
//         observer.next(4);
//         observer.complete();
//       }, 1000);
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
// describe('unsubscribe', function(){
//   it('should unsubscribe', function(done) {
//     function subscribe(observer: any) {
//       var intervalID = setInterval(() => {
//         observer.next('hi');
//       }, 1000);
//       return function unsubscribe() {
//         clearInterval(intervalID);
//       }
//     }
//     var unsubscribe = subscribe({
//       next: (x: any) => expect(x).to.equal('hi'),
//       error: () => done('error should not be called')
//     })
//     this.timeout(3500);
//     setTimeout(function(){
//       unsubscribe();
//       done();
//     }, 3000)
//   })
// })




// case 4
// interval
// describe('interval', function(){
//   it('should pass interval', function(done) {
//     const expected = [0, 1, 2, 3];
//     var observable = interval(1000);
//     var subscription = observable.subscribe({
//       next: (x: any) => expect(x).to.equal(expected.shift()),
//       error: () => done('error should not be called'),
//     });
//     this.timeout(3000);
//     setTimeout(() => {
//       subscription.unsubscribe();
//       done();
//     }, 2500)
//   })
// })
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



