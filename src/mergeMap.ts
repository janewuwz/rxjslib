import Rx from './index'

function mergeMap (this: any, fn: any) {
  const lastObservable = this
  let count = 0
  return Rx.Observable.create(function subscribe(observer: any) {
    count++ 
    return lastObservable.subscribe({
      next: (x: any) => {
        var fnObservable = fn(x)
        count += 1
        fnObservable.subscribe({
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
export default mergeMap
