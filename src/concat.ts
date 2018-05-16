import Rx from './index';

function concat (this: any, obs: any, other: any) {
  var real = this // ⚠️ 这里是如何得到上一个operator的结果
  return Rx.Observable.create(function subscribe(observer: any) {
    let active = 1;
    var h = obs.subscribe({
      next: (x: any) => {
        observer.next(x)
      },
      error: (x: any) => observer.error(x),
      complete: () => {
        active++
        other.subscribe({
          next: (y: any) => {
            observer.next(y)
          },
          error: (y: any) => observer.error(y),
          complete: () => {
            if (--active<=0) {
              observer.complete()
            }
          }
        })
        if (--active<=0) {
          observer.complete()
        }
      }
    })
  })
}
export default concat
