import Rx from './index'

function interval(time: number){
  var i = 0
    return Rx.Observable.create(function subscribe(observer: any) {
      var intervalId = setInterval(() => {
        observer.next(i)
        i++;
      }, time);
    return new Rx.Subscription(function unsubscribe(){
      clearInterval(intervalId)
    })
  })
}

export default interval
