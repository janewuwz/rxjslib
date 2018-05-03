class Observable {
  // 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
  static create(fn: Function) {
    var observers:any = []
    interface inte {
      next: any,
      error: any,
      complete: any
    }
    return {
      subscribe: function(obj: any|inte){
        fn(obj)
      }
    }
  }
}

class Subject {
  subscribe(){}
}

let Rx = {
  Observable,
  Subject,
}

export default Rx
