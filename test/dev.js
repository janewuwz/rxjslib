"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var index_1 = __importDefault(require("./index"));
var interval_1 = __importDefault(require("./interval"));
// case 1
// VM496:13 got value 1
// VM496:13 got value 2
// VM496:13 got value 3
// undefined
// VM496:13 got value 4
// VM496:15 done
var observable = index_1.default.Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(function () {
        observer.next(4);
        observer.complete();
    }, 1000);
});
console.log('just before subscribe');
observable.subscribe({
    next: function (x) { return console.log('got value ' + x); },
    error: function (err) { return console.error('something wrong occurred: ' + err); },
    complete: function () { return console.log('done'); },
});
console.log('just after subscribe');
// case 2
// complete 机制
var observable = index_1.default.Observable.create(function subscribe(observer) {
    try {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
        observer.next(4);
    }
    catch (err) {
        observer.error(err); // 如果捕获到异常会发送一个错误
    }
});
observable.subscribe(function (x) { return console.log(x); });
// case 3
// unsubscribe
function subscribe(observer) {
    var intervalID = setInterval(function () {
        observer.next('hi');
    }, 1000);
    return function unsubscribe() {
        clearInterval(intervalID);
    };
}
var unsubscribe = subscribe({ next: function (x) { return console.log(x); } });
setTimeout(unsubscribe, 5000);
// case 4
// interval
var observable = interval_1.default(1000);
var subscription = observable.subscribe(function (x) { return console.log(x); });
setTimeout(subscription.unsubscribe, 8000);
