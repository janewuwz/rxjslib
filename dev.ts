import 'mocha';
import Rx from './index';
import { expect } from 'chai';
import interval from './interval'

// case 1
// VM496:13 got value 1
// VM496:13 got value 2
// VM496:13 got value 3
// undefined
// VM496:13 got value 4
// VM496:15 done
var observable = Rx.Observable.create(function (observer: any) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});
console.log('just before subscribe');
observable.subscribe({
  next: (x: any) => console.log('got value ' + x),
  error: (err: any) => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');




// case 2
// complete 机制
var observable = Rx.Observable.create(function subscribe(observer: any) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
    observer.next(4);
  } catch (err) {
    observer.error(err); // 如果捕获到异常会发送一个错误
  }
});

observable.subscribe((x:any) => console.log(x));



// case 3
// unsubscribe
function subscribe(observer: any) {
  var intervalID = setInterval(() => {
    observer.next('hi');
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalID);
  };
}

var unsubscribe = subscribe({next: (x : any) => console.log(x)});

setTimeout(unsubscribe, 5000)




// case 4
// interval

var observable = interval(1000);
var subscription = observable.subscribe((x: any) => console.log(x))

setTimeout(subscription.unsubscribe, 5000)

