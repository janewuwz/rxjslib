import Rx from './index';

function combineLatest (this: any, obs: any, func: any) {
  // real, x --> height
  var real = this
  let active = 0
  var temp: any = []
  var f = 0
  return Rx.Observable.create(function subscribe(observer: any) {
    obs.subscribe({
      next: (x: any) => {
        real.subscribe({
          next: (y: any) => {
            temp.push(y) 
          },
          error: (y: any) => observer.error(y),
          complete: () => {
            f=temp[temp.length-1]
            observer.next(func(f, x))
          }
        })
      },
      error: (x: any) => observer.error(x),
      complete: () => {
        observer.complete()
      }
    })
  })
}
export default combineLatest
