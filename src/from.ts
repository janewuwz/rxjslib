import Rx from './index'

function from (arr: Array<any>) {
  return Rx.Observable.create(function subscribe(observer: any) {
    for (var i=0;i<arr.length;i++) {
      observer.next(arr[i])
    }
    return new Rx.Subscription(function unsubscribe(){
      console.log('unsubscribe')
    })
  })
}
export default from
