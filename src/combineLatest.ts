import Rx from './index';

function combineLatest (this: any, curObservable: any, combineFn: any) {
  const lastObservable = this
  const tempValues: any = []
  let lastValue: any
  let subscription: any
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
            observer.next(combineFn(lastValue, y))
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
