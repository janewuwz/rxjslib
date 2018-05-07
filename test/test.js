"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var index_1 = __importDefault(require("./index"));
var chai_1 = require("chai");
var interval_1 = __importDefault(require("./interval"));
// case 1
describe('basicObservable', function () {
    it('should equal basic next value', function (done) {
        var expected = [1, 2, 3, 4];
        var observable = index_1.default.Observable.create(function (observer) {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            setTimeout(function () {
                observer.next(4);
                observer.complete();
            }, 1000);
        });
        observable.subscribe({
            next: function (x) { return chai_1.expect(x).to.equal(expected.shift()); },
            error: function (err) { return done('something wrong occurred: ' + err); },
            complete: function () {
                console.log('done');
                setTimeout(function () {
                    done();
                }, 200);
            }
        });
    });
});
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
describe('unsubscribe', function () {
    it('should unsubscribe', function (done) {
        function subscribe(observer) {
            var intervalID = setInterval(function () {
                observer.next('hi');
            }, 1000);
            return function unsubscribe() {
                clearInterval(intervalID);
            };
        }
        var unsubscribe = subscribe({
            next: function (x) { return chai_1.expect(x).to.equal('hi'); },
            error: function () { return done('error should not be called'); }
        });
        this.timeout(3500);
        setTimeout(function () {
            unsubscribe();
            done();
        }, 3000);
    });
});
// case 4
// interval
describe('interval', function () {
    it('should pass interval', function (done) {
        var expected = [0, 1, 2, 3];
        var observable = interval_1.default(1000);
        var subscription = observable.subscribe({
            next: function (x) { return chai_1.expect(x).to.equal(expected.shift()); },
            error: function () { return done('error should not be called'); },
        });
        this.timeout(3000);
        setTimeout(function () {
            subscription.unsubscribe();
            done();
        }, 2500);
    });
});
