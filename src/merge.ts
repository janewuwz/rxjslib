import Rx from './index'

function merge (this: any, obs: any, two: any) {
  // obs: bar;   real: foo     foo.merge(bar)
  // ⚠️ 这里是如何得到上一个operator的结果
  return Rx.Observable.create(function subscribe(observer: any) {
    obs.subscribe(observer)
    two.subscribe(observer)
    return new Rx.Subscription(function unsubscribe(){
      console.log('unsubscribe')
    })
  })
}
export default merge
