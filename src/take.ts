import Rx from './index'

function take (this: any, num: number) {
  var lastObservable = this
  return Rx.Observable.create(function subscribe(observer: any) {
    let count = 0
    return lastObservable.subscribe({
      next: (x: any) => {
        count += 1
        if (count === num - 1) {
          observer.next(x)
          observer.complete()
        } else if (count < num) {
          observer.next(x)
        }
      },
      error: (e: any) => observer.error(e),
      complete: () => observer.complete()
    }) 
  })
}
export default take
