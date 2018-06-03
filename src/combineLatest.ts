import Rx from './index';

function combineLatest (this: any, curObservable: any, combineFunc: any) {
  var lastObservable = this
  var tempValues: any = []
  var lastValue: any
  var subscription: any
  return Rx.Observable.create(function subscribe(observer: any) {
    lastObservable.subscribe({
      next: (x: any) => {
        tempValues.push(x)
      },
      error: (e: any) => observer.error(e),
      complete: () => {
        subscription = curObservable.subscribe({
          next: (y: any) => {
            lastValue=tempValues[tempValues.length-1]
            observer.next(combineFunc(lastValue, y))
          },
          error: (e: any) => observer.error(e),
          complete: () => {
            observer.complete()
          }
        })
      }
    })
    return subscription
  })
}
export default combineLatest
