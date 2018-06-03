import Rx from './index'

function filter (this: any, filterFunc: Function) {
  var lasObservable = this
  return Rx.Observable.create(function subscribe(observer: any) {
    return lasObservable.subscribe({
      next: (x: any) => {
        try {
          if (filterFunc(x)) observer.next(x)
        } catch (e) {
          observer.error(e)
          return
        }
      },
      error: (e: any) => {
        observer.error(e)
      },
      complete: () => {
        observer.complete()
      }
    })
  })
}
export default filter
