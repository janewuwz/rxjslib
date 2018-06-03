import Rx from './index'

function merge (this: any, obs: any, two: any) {
  var subscriptions: any = []
  var allObservables = Array.prototype.slice.call(arguments)
  return Rx.Observable.create(function subscribe(observer: any) {
    allObservables.forEach((observable: any) => {
      var subscription = observable.subscribe(observer)
      subscriptions.push(subscription)
    });
    return new Rx.Subscription(function unsubscribe(){
      subscriptions.forEach((subscription: any) => {
        subscription.unsubscribe()
      });
    })
  })
}
export default merge
