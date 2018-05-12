import Rx from './index'

function interval(time: number){
  var i = 0
    return Rx.Observable.create(function subscribe(observer: any) {
    var intervalId = setInterval(() => {
      observer.next(i)
      i++;
    }, time);
    // 返回一个有subscribe函数的对象，即Subscription
    return new Rx.Subscription(function unsubscribe(){
      clearInterval(intervalId)
    })
  })
}

export default interval
