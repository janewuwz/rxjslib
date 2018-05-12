import interval from './interval'
import take from './take'
import filter from './filter'
import map from './map'
import concat from './concat'
import merge from './merge'
import zip from './zip'

class Subscription {
  [index: string]: any;
  constructor(unsubscribe: Function){
    this.unsubscribe = unsubscribe
  }
}

class Subscriber {
  [index: string]: any;
  constructor(observer: object) {
    this.observer = observer
    this.stopped = false
  }
  next (x: any) {
    if (this.stopped) return
    if (typeof this.observer === 'function') {
      this.observer(x)
    } else {
      this.observer.next(x)
    }
  }
  error(e: any) {
    this.observer.error(e)
    // this.unsubscribe()
  }
  complete(){
    this.stopped = true
    this.observer.complete()
    // this.unsubscribe()
    // 执行unsubscribe,return unsubscribe对象
  }
}

class Observable {
  constructor(subscribe: any){
    this.subscribe = subscribe
    this.take = take
    this.interval = interval
    this.zip = zip
    this.merge = merge
    this.concat = concat
    this.filter = filter
  }
  [index: string]: any;
  // 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
  static create(subscribe: Function) {
    // 因为调用的时候,observalble.subscribe的参数可以不是对象，而是直接的（next）函数，所以这里构造一个内部对象
    interface LooseObject {
      [key: string]: any
    }
    // 返回的对象，直接用了Observable
    // 对象要有subscribe函数,并且返回的subscription有unsubscribe
    return new Observable(function(observer: object) {
      var subscriber = new Subscriber(observer)
      var subscription = subscribe(subscriber)
      return subscription
      // 如何保证subscription一定有unsubscribe ????
    })
  }
}

class Subject {
  subscribe(){}
}

let Rx = {
  Observable,
  Subject,
  Subscription
}

export default Rx
