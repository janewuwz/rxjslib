import Rx from './index';

function filter (this: any, func: Function) {
  var real = this // ⚠️ 这里是如何得到上一个operator的结果

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
