import Rx from './index'

function fromEvent (target: EventTarget, event: string) {
  return Rx.Observable.create(function subscribe(observer: any) {
    target.addEventListener(event, observer.next)
    return new Rx.Subscription(function unsubscribe(){
      target.removeEventListener(event, observer.next)
    })
  })
}
export default fromEvent
