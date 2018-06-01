import Rx from './index'

function switchMap (this: any, func: any, two: any) {
  // obs: bar;   real: foo     foo.merge(bar)
  // ⚠️ 这里是如何得到上一个operator的结果
  const last = this
  // obs: other observable function
  return Rx.Observable.create(function subscribe(observer: any) {
    var g = func()
    var s = last.subscribe({
      next: (x: any) => observer.next(x),
      error: (err: any) => observer.error(err),
      complete: () => {
        s.unsubscribe()
        g.subscribe({
          next: (x: any) => observer.next(x),
          error: (err: any) => observer.error(err),
          complete: () => observer.complete()
        })
      }
    })

    return new Rx.Subscription(function unsubscribe(){
      console.log('unsubscribe')
    })
  })
}
export default switchMap
