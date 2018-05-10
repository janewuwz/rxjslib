"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var interval_1 = __importDefault(require("./interval"));
var take_1 = __importDefault(require("./take"));
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
// observable.subscribe((x:any) => console.log(x));
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
// var observable = from([1,2,3])
// observable.filter = filter
// var result = observable.filter((val: number) => val !== 2);
// result.subscribe((val:any) => console.log(val))
// case 8
// of
// var observable = of(1,2,3)
// observable.subscribe((val: any) => console.log(val))
// case 9
// take
var observable = interval_1.default(500);
observable.take = take_1.default;
var result = observable.take(4);
result.subscribe(function (x) { return console.log(x); });
