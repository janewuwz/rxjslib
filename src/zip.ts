import Rx from './index'

function zip (this: any, obs: any, exec: Function) {
  var real = this
  var temp: any= []
  var temp2: any = []
  var flag: any = undefined
  // 1快 2慢  为true
  return Rx.Observable.create(function subscribe(observer: any) {
    real.subscribe({
      next: (val: any) => {
        // 0 1 2 3
        temp.push(val)
        if (flag === undefined && temp2.length !== 0) {
          // 2快
          flag = false
          return
        }
        if (flag === false) {
          observer.next(exec(temp.shift(), temp2.shift()))
        }
      },
      error: (x: any) => observer.error(x),
      complete: () => {}
    })
    obs.subscribe({
      next: (val: any) => {
        // var   0 1 2 3 4
        temp2.push(val)
        if (flag === undefined && temp.length !== 0) {
          // 1快
          flag = true
          return
        }
        if (flag === true) {
          observer.next(exec(temp.shift(), temp2.shift()))
        }
      },
      error: (x: any) => observer.next(x),
      complete: () => {}
    })
    return {
      unsubscribe: function(){
        console.log('unsubscribe')
      }
    }
  })
}
export default zip
