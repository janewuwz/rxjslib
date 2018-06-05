import interval from './interval'
import take from './take'
import filter from './filter'
import map from './map'
import concat from './concat'
import merge from './merge'
import zip from './zip'
import scan from './scan'
import combineLatest from './combineLatest'
import from from './from'
import of from './of'
import multicast from './multicast'
import switchMap from './switchMap'
import mergeMap from './mergeMap'

class Subscription {
  [index: string]: any;
  constructor(unsubscribe?: Function){
    this.unsubscribe = unsubscribe
  }
}

class Subscriber extends Subscription {
  [index: string]: any;
  constructor(observer: object) {
    super()
    this.observer = observer
    this.stopped = false
  }
  next (x: any) {
    // 真正的需要执行的next函数
    if (this.stopped) return
    if (typeof this.observer === 'function') {
      this.observer(x)
    } else {
      this.observer.next(x)
    }
  }
  error(e: any) {
    this.stopped = true
    if (typeof this.observer === 'function') {
      this.observer.error = function(){}
      return
    }
    this.observer.error(e)
    this.unsubscribe && this.unsubscribe() // 不优雅
  }
  complete(){
    this.stopped = true
    if (typeof this.observer === 'function') {
      this.observer.complete = function(){}
      return
    }
    this.observer.complete()
    this.unsubscribe && this.unsubscribe() // 不优雅
    // 执行unsubscribe,return unsubscribe对象
  }
}

class Observable {
  static interval : any;
  static zip : any;
  static merge : any;
  static concat : any;
  static of: any;
  static from: any;
  static combineLatest : any;
  constructor(subscribe?: any){
    this.subscribe = subscribe
    this.filter = filter
    this.take = take
    this.map = map
    this.mergeMap = mergeMap
    this.zip = zip
    this.scan = scan
    this.combineLatest = combineLatest
    this.multicast = multicast
    this.switchMap = switchMap
  }

  [index: string]: any;
  // 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
  static create(subscribe: Function) {
    // 因为调用的时候,observalble.subscribe的参数可以不是对象，而是直接的（next）函数，所以这里构造一个内部对象

    // 返回的对象，直接用了Observable
    // 对象要有subscribe函数,并且返回的subscription有unsubscribe
    return new Observable(function(observer: any) {

      var subscriber = new Subscriber(observer)
      var subscription = subscribe(subscriber)
      subscriber.unsubscribe = subscription && subscription.unsubscribe.bind(subscription) //？？？？
      return subscription
      // 如何保证subscription一定有unsubscribe ????
    })
  }
}


class Subject extends Observable {
  constructor(){
    super(function subscribe (this: any, observer: any) {
      this.observers.push(observer)
      // ???????
      return new Subscription(() => {
        const index = this.observers.indexOf(observer)
        if (index >= 0) {
          this.observers.splice(index, 1)
        }
      })
    })
    this.observers = []
  }

  next (x: any) {
    this.observers.forEach((observer: any) => observer.next(x))
  }

  error(e: any) {
    this.observers.forEach((observer: any) => observer.error(e))
  }

  complete(){
    this.observers.forEach((observer: any) => observer.complete())
  }
}

let Rx = {
  Observable,
  Subject,
  Subscription
}

Rx.Observable.of = of
Rx.Observable.interval = interval
Rx.Observable.from = from
Rx.Observable.concat = concat
Rx.Observable.merge = merge
Rx.Observable.combineLatest = combineLatest

export default Rx
