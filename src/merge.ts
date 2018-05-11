import Rx from './index'

function merge (this: any, obs: any) {
  // obs: bar;   real: foo     foo.merge(bar)
  var real = this // ⚠️ 这里是如何得到上一个operator的结果
  return Rx.Observable.create(function subscribe(observer: any) {
    real.subscribe(observer)
    obs.subscribe(observer)
    return {
      unsubscribe: function(){
        console.log('unsubscribe')
      }
    }
  })
}
export default merge
