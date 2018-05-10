"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable = /** @class */ (function () {
    function Observable() {
    }
    // 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
    Observable.create = function (fn) {
        var observers = fn;
        var done = false;
        // 因为调用的时候,observalble.subscribe的参数可以不是对象，而是直接的（next）函数，所以这里构造一个内部对象
        function unsubscribe() { }
        function dec(obj) {
            var internal = {
                next: function (x) {
                    if (typeof obj === 'function') {
                        obj(x);
                    }
                    else {
                        obj.next(x);
                    }
                },
                // 如何compolete，或者停止执行?
                complete: function () {
                    obj.complete();
                    unsubscribe();
                },
                error: function (e) {
                    obj.error && obj.error(e);
                    unsubscribe();
                }
            };
            return internal;
        }
        var obj = {
            subscribe: function (obj) {
                var middle = dec(obj);
                var subscription = fn(middle);
                return {
                    unsubscribe: subscription && subscription.unsubscribe
                };
            }
        };
        return obj;
    };
    return Observable;
}());
var Subject = /** @class */ (function () {
    function Subject() {
    }
    Subject.prototype.subscribe = function () { };
    return Subject;
}());
var Rx = {
    Observable: Observable,
    Subject: Subject
};
exports.default = Rx;
