import Rx from './index'

function zip (this: any, obs: any) {
  var real = this
  return Rx.Observable.create(function subscribe(observer: any) {
    real.subscribe((val: any) => {
      console.log('foo: ' + val)
    })
    return {
      unsubscribe: function(){
        console.log('unsubscribe')
      }
    }
  })
}
export default zip
