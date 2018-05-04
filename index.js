"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable = /** @class */ (function () {
    function Observable() {
    }
    // 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
    Observable.create = function (fn) {
        var observers = [];
        var done = false;
        var intentObj = {
            next: function () { console.log('next'); },
            complete: function () { delete intentObj.next; },
            error: function () { }
        };
        return {
            subscribe: function (obj) {
                if (typeof obj === 'function') {
                    intentObj.next = obj;
                    fn(intentObj);
                    return;
                }
                fn(obj);
            }
        };
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
    Subject: Subject,
};
exports.default = Rx;
