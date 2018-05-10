"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
function filter(func) {
    var real = this; // ⚠️ 这里是如何得到上一个operator的结果
    return index_1.default.Observable.create(function subscribe(observer) {
        real.subscribe(function (val) {
            if (func(val)) {
                observer.next(val);
            }
        });
        return {
            unsubscribe: function () {
                console.log('unsubscribe');
            }
        };
    });
}
exports.default = filter;
