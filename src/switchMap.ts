import Rx from './index'

function switchMap (this: any, fn: any) {
  const lastObservable = this
  let count = 0
  var subscriptions: any = []
  return Rx.Observable.create(function subscribe(observer: any) {
    count++ 
    lastObservable.subscribe({
      next: (x: any) => {
        var fnObservable = fn(x)
        count += 1
        if (subscriptions.length > 0) {
          subscriptions.shift().unsubscribe()
          count--
          if (count === 0) {
            observer.complete()
          }
        }
        var subscription = fnObservable.subscribe({
          next: (y: any) => {
            observer.next(y)
          },
          error: (e: any) => {
            observer.error(e)
          },
          complete: () => {
            count--
            if (count === 0) {
              observer.complete()
            }
          }
        })
        subscriptions.push(subscription)
      },
      error: (e: any) => {
        observer.error(e)
      },
      complete: () => {
        if (--count === 0) {
          observer.complete()
        }
      }
    })
  })
}
export default switchMap
