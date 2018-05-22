import 'mocha';
import Rx from './src/index';
import { expect } from 'chai';
import interval from './src/interval'
import from from './src/from'
import of from './src/of'
import concat from './src/concat'
import merge from './src/merge';

Rx.Observable.of = of
Rx.Observable.interval = interval
Rx.Observable.from = from
Rx.Observable.concat = concat
Rx.Observable.merge = merge

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

// var observable =  Rx.Observable.interval(1000);
// var subscription = observable.subscribe({
//   next: (x: any) => console.log(x),
//   error: (x: any) => console.log(x),
//   complete: () => {}
// })

// setTimeout(subscription.unsubscribe, 4000)

// case 6
// from
// var observable = Rx.Observable.from([1,2,3]);
// observable.subscribe((val: any) => console.log(val));


// case 7
// filter
// difficulty  => 链式调用
// var observable = Rx.Observable.from([1,2,3]).filter((x: number) => x !== 2);
// observable.subscribe((x:any) => console.log(x))





// case 8
// of
// var observable = Rx.Observable.of(1,2,3)
// observable.subscribe((val: any) => console.log(val))



// case 9
// take
// var observable = Rx.Observable.interval(500).take(4)
// observable.subscribe((x: any) => console.log(x))



// case 10
// map
// var observable = Rx.Observable.interval(500).take(4).map((x:number) => x*2)
// observable.subscribe({
//   next: (x: number) => console.log(x),
//   error: (err: any) => console.log(err),
//   // TODO done
//   complete: () => console.log('done')
// })





// case 11  ---->  concat
// difficulty  combine observables

// var foo  = Rx.Observable.interval(500).take(4)
// var more = Rx.Observable.of(4,5,6,7)
// var bar = Rx.Observable.concat(foo, more)
// bar.subscribe({
//   next: (x: any) => console.log(x),
//   error: (err: any) => console.log(err),
//   complete: () => {console.log('done')}
// })


// case 12 ------> merge
//TODO 少一个数字
// var foo = Rx.Observable.interval(500).take(4)
// var bar = Rx.Observable.interval(300).take(5)
// var merged = Rx.Observable.merge(foo, bar)
// merged.subscribe({
//   next: (x: any) => console.log(x),
//   error: (err: any) => console.log(err),
//   complete: () => {}
// })




// case 13 -----> zip
// 0 2 4 6 done
var foo = Rx.Observable.interval(500).take(5)
var bar = Rx.Observable.interval(400).take(4)
var combined = foo.zip(bar, (x: number, y: number) => x+y)
// TODO done 没执行
combined.subscribe({
  next: (x: any) => console.log(x),
  error: (err: any) => console.log(err),
  complete: () => {console.log('done')}
})



// case 14 -----> combineLatest
// var weight = Rx.Observable.of(70, 72, 76, 79, 75);
// var height = Rx.Observable.of(1.76, 1.77, 1.78);
// var bmi = weight.combineLatest(height, (w: any, h: any) => w / (h * h));

// bmi.subscribe({
//   next: (x: any) => console.log('BMI is ' + x),
//   error: (x: any) => console.log(x),
//   complete: () => {console.log('done')}
// });


// case 15 -----> scan
//TODO zip有bug！！
// var foo = Rx.Observable.of('h', 'e', 'l', 'l', 'o')
// var bar = Rx.Observable.interval(500).take(6)
// var combined = foo.zip(bar, (x: any, y: any) => x).scan((acc: any, cur: any) => acc+cur, '')
// combined.subscribe({
//   next: (x: any) => console.log(x),
//   error: (x: any) => console.log(x),
//   complete: () => {}
// })
