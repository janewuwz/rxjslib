import 'mocha';
import Rx from './index';
import { expect } from 'chai';

var observable = Rx.Observable.create(function (observer: any) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

observable.subscribe({
  next: (x: any) => console.log('got value ' + x),
  error: (err: any) => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
