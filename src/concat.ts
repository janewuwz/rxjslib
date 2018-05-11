import Rx from './index';

function concat (this: any, obs: any) {
  var real = this // ⚠️ 这里是如何得到上一个operator的结果

  return Rx.Observable.create(function subscribe(observer: any) {
    var subscription = real.subscribe(observer)
    subscription.unsubscribe()
    return {
      unsubscribe: function(){
        console.log('unsubscribe');
      }
    }
  })
}
export default concat
