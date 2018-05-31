import Rx from './index'

function take (this: any, num: number) {
  var real = this
  return Rx.Observable.create(function subscribe(observer: any) {

    try {
      var subscription = real.subscribe((val: any) => {
        if (val === num - 1) {
          observer.next(val)
          subscription.unsubscribe()
          observer.complete()
        } else if (val < num) {
          observer.next(val)
        }
      },)   
    } catch (error) {
      observer.error(error)
    }
  })
}
export default take
