import Rx from './index';

function combineLatest (this: any, real: any, func: any) {
  var obs = this //real:interval    obs:from
  let active = 0
  var temp: any = []
  var f = 0
  let subscription: any
  return Rx.Observable.create(function subscribe(observer: any) {
    obs.subscribe({
      next: (x: any) => {
        temp.push(x)
        subscription = real.subscribe({
          next: (y: any) => {
            f=temp[temp.length-1]
            observer.next(func(f, y))
          },
          error: (y: any) => observer.error(y),
          complete: () => {
            observer.complete()
          }
        })
      },
      error: (x: any) => observer.error(x),
      complete: () => {
        subscription.unsubscribe()
      }
    })
    return new Rx.Subscription(function unsubscribe(){
    })
  })
}
export default combineLatest
