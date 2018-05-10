import interval from './interval'

class Observable {
  constructor(){}
  [index: string]: any;
  // 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
  static create(fn: Function) {
    var observers:any = fn
    var done = false
    // 因为调用的时候,observalble.subscribe的参数可以不是对象，而是直接的（next）函数，所以这里构造一个内部对象
    function unsubscribe(){}
    function dec(obj: any) {
      var internal = {
        next: (x: any) => {
          if (typeof obj === 'function') {
            obj(x)
          } else {
            obj.next(x)
          }
        },
        // 如何compolete，或者停止执行?
        complete: () => {
          obj.complete();
          unsubscribe();
        }, 
        error: (e: any) => {
          obj.error && obj.error(e); 
          unsubscribe();
        }
      }
      return internal
    }
    interface LooseObject {
      [key: string]: any
    }
    var obj: LooseObject = {
      subscribe: function(obj: any){
        var middle = dec(obj)
        var subscription = fn(middle)
        return {
          unsubscribe: subscription && subscription.unsubscribe
        }
      } 
    }
    return obj
  }
}

class Subject {
  subscribe(){}
}

let Rx = {
  Observable,
  Subject
}

export default Rx
