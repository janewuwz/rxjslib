import Rx from './index'

function map (this: any, mapFn: Function) {
  var lastObservable = this
  return Rx.Observable.create(function subscribe(observer: any) {
    return lastObservable.subscribe({
      next: (x: any) => {
        try {
          var newval = mapFn(x)
        } catch (error) {
          observer.error(error)
          return
        }
        observer.next(newval)
      },
      error: (e: any) => observer.error(e),
      complete: () => {
        observer.complete()        
      }
    })
  })
}
export default map
