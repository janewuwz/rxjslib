import Rx from './index'

function scan (this: any, init: any, scanFn: Function) {
  var lastObservable = this
  let accu: any = undefined
  return Rx.Observable.create(function subscribe(observer: any) {
    let val
    return lastObservable.subscribe({
      next: (x: any) => {
        val = accu === undefined ? scanFn(x, init) : scanFn(x, accu)
        observer.next(val)
        accu = val
      },
      error: (e: any) => observer.error(e),
      complete: () => {
        observer.complete()
      }
    })
  })
}
export default scan

