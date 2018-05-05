"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
function interval(time) {
    var i = 0;
    return index_1.default.Observable.create(function subscribe(observer) {
        var intervalId = setInterval(function () {
            observer.next(i);
            i++;
        }, time);
        return {
            unsubscribe: function () {
                clearInterval(intervalId);
            }
        };
    });
}
exports.default = interval;
