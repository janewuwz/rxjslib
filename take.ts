import Rx from './index';

function take (this: any, num: number) {
  var real = this
  return Rx.Observable.create(function subscribe(observer: any) {
     var subscription = real.subscribe((val: any) => {
      if (val === num) {
        subscription.unsubscribe()
        return
      }
      observer.next(val)
    })
    return {
      unsubscribe: function(){
        console.log('unsubscribe')
      }
    }
  })
}
export default take
