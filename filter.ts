import Rx from './index';

function filter (this: any, func: Function) {
  var real = this

  return Rx.Observable.create(function subscribe(observer: any) {
    real.subscribe((val: any) => {
      if (func(val)){
        observer.next(val)
      }
    })
    return {
      unsubscribe: function(){
        console.log('unsubscribe')
      }
    }
  })
}
export default filter
