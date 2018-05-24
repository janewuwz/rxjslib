import Rx from './index'

function multicast (this: any, subject: any) {
  var source = this
  subject.connect = function(){
    source.subscribe(subject)
  }
  return subject
}

export default multicast
