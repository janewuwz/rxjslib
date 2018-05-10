import Rx from './index';

function fromEvent (target: EventTarget, event: string) {
  return Rx.Observable.create(function subscribe(observer: any) {
    target.addEventListener(event, observer.next)
    return {
      unsubscribe: function(){
        console.log('unsubscribe')
        target.removeEventListener(event, observer.next)
      }
    }
  })
}
export default fromEvent
