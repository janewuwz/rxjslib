class Observable {
  // 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
  static create(fn: Function) {
    var observers:any = []
    var done = false
    // 因为调用的时候,observalble.subscribe的参数可以不是对象，而是直接的（next）函数，所以这里构造一个内部对象
    var internal = {
      next: () => {},
      complete: () => {delete internal.next},
      error: () => {}
    }
    return {
      subscribe: function(obj: any){
        if (typeof obj === 'function') {
          internal.next = obj
          return {
            unsubscribe: fn(internal).unsubscribe
          }
        }
        return {
          unsubscribe: fn(obj).unsubscribe
        }
      }
    }
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
