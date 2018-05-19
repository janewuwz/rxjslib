import Rx from './index'

function scan (this: any, func: Function, init: any) {
  var real = this
  var temp: any = []
  return Rx.Observable.create(function subscribe(observer: any) {
    real.subscribe({
      next: (x: any) => {
        temp.push(x)
        if (temp.length > 0) {
          observer.next(temp.join(''))
        } else {
          observer.next(x)
        }
        
      },
      error: (x: any) => observer.error(x),
      complete: () => observer.complete()
    })
    return new Rx.Subscription(function unsubscribe(){
      console.log('unsubscribe')
    })
  })
}
export default scan

