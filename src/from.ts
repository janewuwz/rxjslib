import Rx from './index'

function from (arr: Array<any>) {
  return Rx.Observable.create(function subscribe(observer: any) {
    for (var i=0;i<arr.length;i++) {
      observer.next(arr[i])
    }
    return {
      unsubscribe: function(){
        console.log('unsubscribe')
      }
    }
  })
}
export default from
