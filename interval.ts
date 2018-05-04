import Rx from './index'

function interval(time: number){ 
  var i = 0
    return Rx.Observable.create(function subscribe(observer: any) {
    var intervalId = setInterval(() => {
      observer.next(i)
      i++;
    }, time);
    return {
      unsubscribe: function(){
        clearInterval(intervalId)
      }
    }
  })
}

export default interval
