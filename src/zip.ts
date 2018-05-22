import Rx from './index'

function zip (this: any, bar: any, exec: Function) {
  var foo = this
  var temp: any= []
  var temp2: any = []
  var flag: any = undefined
  // 1快 2慢  为true
  // bar  0 1 2 3 
  // foo 01234
  return Rx.Observable.create(function subscribe(observer: any) {
    foo.subscribe({
      next: (val: any) => {
        temp.push(val)
        bar.subscribe({
          next: (x: any) => {
            temp2.push(x)
            if (temp.length === 0) {
              return
            }
            var prev = temp.shift()
            var a = temp2.shift()
            var value = exec(prev, a)
            observer.next(value)
          },
          error: (x: any) => observer.error(x),
          complete: () => observer.complete()
        })
      },
      error: (x: any) => observer.error(x),
      complete: () => observer.complete()
    })
    return {
      unsubscribe: function(){
        console.log('unsubscribe')
      }
    }
  })
}
export default zip
