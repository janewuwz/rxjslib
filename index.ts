class Observable {
  static create(fn: Function) {
    fn()
  }
  subscribe(){}
}

class Subject {
  subscribe(){}
}

let Rx = {
  Observable,
  Subject,
}

export default Rx
