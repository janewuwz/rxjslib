"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return index_1.default.Observable.create(function subscribe(observer) {
        for (var i = 0; i < args.length; i++) {
            observer.next(args[i]);
        }
        return {
            unsubscribe: function () {
                console.log('unsubscribe');
            }
        };
    });
}
exports.default = of;
