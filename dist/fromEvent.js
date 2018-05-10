"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
function fromEvent(target, event) {
    return index_1.default.Observable.create(function subscribe(observer) {
        target.addEventListener(event, observer.next);
        return {
            unsubscribe: function () {
                console.log('unsubscribe');
                target.removeEventListener(event, observer.next);
            }
        };
    });
}
exports.default = fromEvent;
