import Rx from './index'

function map (this: any, func: Function) {
  var real = this
  return Rx.Observable.create(function subscribe(observer: any) {
    // observer是index中的observer
    real.subscribe({
      next: (val: any) => {
        var newval = func(val)
        try {
          observer.next(newval)
        } catch (error) {
          error(error)
        }
      },
      error: (x: any) => observer.error(x),
      complete: () => {
        observer.complete()        
      }
    })
    return new Rx.Subscription(function unsubscribe(){
      console.log('unsubscribe')
    })
  })
}
export default map
