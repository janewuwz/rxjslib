import Rx from './index'

function of (...args: number[]) {
  return Rx.Observable.create(function subscribe(observer: any) {
    try {
      for (var i=0;i<args.length;i++) {
        observer.next(args[i])
      }      
    } catch (err) {
      observer.error(err)
    }
    observer.complete()
    return new Rx.Subscription(function unsubscribe(){
      console.log('unsubscribe')
    })
  })
}
export default of

