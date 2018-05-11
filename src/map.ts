import Rx from './index'

function map (this: any, func: Function) {
  var real = this
  return Rx.Observable.create(function subscribe(observer: any) {
    real.subscribe((val: any) => {
      var newval = func(val)
      observer.next(newval)
    })
    return {
      unsubscribe: function(){
        console.log('unsubscribe')
      }
    }
  })
}
export default map
