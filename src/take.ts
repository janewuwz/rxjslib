import Rx from './index'

function take (this: any, num: number) {
  var real = this
  return Rx.Observable.create(function subscribe(observer: any) {

    try {
      var subscription = real.subscribe({
        next: (val: any) => {
          if (val === num) {
            subscription.unsubscribe()
            observer.complete()
            return
          }
          observer.next(val)
        },
        error: (err: any) => observer.error(),
        complete: () => {
          observer.complete()
        }
      })    
    } catch (error) {
      observer.error(error)
    }
    return new Rx.Subscription(function unsubscribe(){
      console.log('unsubscribe')
    })
  })
}
export default take
