"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
function from(arr) {
    return index_1.default.Observable.create(function subscribe(observer) {
        for (var i = 0; i < arr.length; i++) {
            observer.next(arr[i]);
        }
        return {
            unsubscribe: function () {
                console.log('unsubscribe');
            }
        };
    });
}
exports.default = from;
