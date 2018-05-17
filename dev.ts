import 'mocha';
import Rx from './src/index';
import { expect } from 'chai';
import interval from './src/interval'
import fromEvent from './src/fromEvent'
import from from './src/from'
import of from './src/of'
import concat from './src/concat'

// case 1
// VM496:13 got value 1
// VM496:13 got value 2
// VM496:13 got value 3
// undefined
// VM496:13 got value 4
// VM496:15 done
// var observable = Rx.Observable.create(function (observer: any) {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   setTimeout(() => {
//     observer.next(4);
//     observer.complete();
//   }, 1000);
//   return {
//     unsubscribe: function unsubscribe(){}
//   }
// });
// console.log('just before subscribe');
// observable.subscribe({
//   next: (x: any) => console.log('got value ' + x),
//   error: (err: any) => console.error('something wrong occurred: ' + err),
//   complete: () => console.log('done'),
// });
// console.log('just after subscribe');




// case 2
// complete 机制
// var observable = Rx.Observable.create(function subscribe(observer: any) {
//   try {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     observer.complete();
//     observer.next(4);
//   } catch (err) {
//     observer.error(err); // 如果捕获到异常会发送一个错误
//   }
// });

// observable.subscribe({
//   next: (x: any) => console.log('got value ' + x),
//   error: (err: any) => console.error('something wrong occurred: ' + err),
//   complete: () => console.log('done'),
// });




// case 3
// unsubscribe
// function subscribe(observer: any) {
//   var intervalID = setInterval(() => {
//     observer.next('hi');
//   }, 1000);

//   return function unsubscribe() {
//     clearInterval(intervalID);
//   };
// }

// var unsubscribe = subscribe({next: (x : any) => console.log(x)});

// setTimeout(unsubscribe, 5000)





// case 4
// interval
// var observable = interval(1000);
// var subscription = observable.subscribe((x: any) => console.log(x))

// setTimeout(subscription.unsubscribe, 4000)





// case 5
// fromEvent




// case 6
// from
// var observable = from([1,2,3]);
// observable.subscribe((val: any) => console.log(val));




// case 7
// filter
// difficulty  => 链式调用
// var observable = from([1,2,3]).filter((x: number) => x !== 2);
// observable.subscribe((x:any) => console.log(x))





// case 8
// of
// var observable = of(1,2,3)
// observable.subscribe((val: any) => console.log(val))



// case 9
// take
// Rx.Observable.prototype.take = take
// var observable = interval(500).take(4)
// observable.subscribe((x: any) => console.log(x))



// case 10
// map
// var observable = interval(500).take(4).map((x:number) => x*2)
// observable.subscribe({
//   next: (x: number) => console.log(x),
//   error: (err: any) => console.log(err),
//   complete: () => {console.log('done')}
// })





// case 11  ---->  concat
// difficulty  combine observables
// var foo  = interval(500).take(4)
// var more = of(4,5,6,7)
// var bar = concat(foo, more)
// bar.subscribe({
//   next: (x: any) => console.log(x),
//   error: (err: any) => console.log(err),
//   complete: () => {console.log('done')}
// })


// case 12 ------> merge

// var foo = interval(500).take(4)
// var bar = interval(300).take(5)
// var merged = foo.merge(bar)
// merged.subscribe({
//   next: (x: any) => console.log(x),
//   error: (err: any) => console.log(err),
//   complete: () => {}
// })




// case 13 -----> zip
// var foo = interval(500).take(5)
// var bar = interval(400).take(4)
// var combined = foo.zip(bar, (x: number, y: number) => x+y)

// combined.subscribe({
//   next: (x: any) => console.log(x),
//   error: (err: any) => console.log(err),
//   complete: () => {console.log('done')}
// })



// case 14 -----> combineLatest
var weight = of(70, 72, 76, 79, 75);
var height = of(1.76, 1.77, 1.78);
var bmi = weight.combineLatest(height, (w: any, h: any) => w / (h * h));

bmi.subscribe({
  next: (x: any) => console.log('BMI is ' + x),
  error: (x: any) => console.log(x),
  complete: () => {console.log('done')}
});
