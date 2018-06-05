import Rx from './index';

export default function concat (this: any, one: any, other: any) {
  return Rx.Observable.create(function subscribe(observer: any) {
    return one.subscribe({
      next: (x: any) => {
        observer.next(x)
      },
      error: (e: any) => observer.error(e),
      complete: () => {
        other.subscribe({
          next: (y: any) => {
            observer.next(y)
          },
          error: (e: any) => observer.error(e),
          complete: () => {
            observer.complete()
          }
        })
      }
    })
  })
}
