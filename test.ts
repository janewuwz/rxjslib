import 'mocha';
import Rx from './index';
import { expect } from 'chai';

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
