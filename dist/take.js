"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
function take(num) {
    var real = this;
    return index_1.default.Observable.create(function subscribe(observer) {
        var subscription = real.subscribe(function (val) {
            if (val === num) {
                subscription.unsubscribe();
                return;
            }
            observer.next(val);
        });
        return {
            unsubscribe: function () {
                console.log('unsubscribe');
            }
        };
    });
}
exports.default = take;
