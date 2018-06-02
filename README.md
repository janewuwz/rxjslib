# rxjs implemention

------



这篇博客主要记录一下自己实现一个简单的**rxjs**库的过程，分析其实现难点，理解深入其原理。 以下是主要内容：

> * rx基本的几个对象（Observable、Subject)
> * 一些操作符
> * 撰写发布技术文稿（代码支持）
> * 撰写发布学术论文（LaTeX 公式支持）

------

## Rx基本对象

rx的主要构成是这几个对象：
```javascript
let Rx = {
  Observable,
  Subject,
  Subscription
}
```
### 1. Observable(可观察对象)
我们创建一个Observable，是通过使用Rx.Observable.create(function subscribe(){})。
所以，作为class Observable的静态方法，这个方法主要做了什么？

表面来看:
这个方法调用后返回一个对象observable，这个对象要有subscribe方法（subscribe作为create的参数传入，subscribe还包含了以后三种状态的参数），执行subscribe()，（传入的参数observer规定了我们具体想在next或其他两种状态时做什么）。生成一个对象(subscription)，subscription还要有unsubscribe方法。

然而，实际在Observable内部，调用时却并不是直接执行subscribe的。
而实际做的是：
首先对传入的observer进行一层包装，生成的新对象比如我们叫它subcriber。怎么包装的呢？
Subscriber类要有next、error、complete三个方法，当然这三个方法主要做的就是执行observer对象中对应的方法。以及complete控制next的停止等。
然后再执行subscribe，传入我们包装好的参数。最后，为执行生成的结构绑定unsubscirbe方法。

所以在开始返回的observable后，暴露的subscribe方法并不直接是传入的subcribe函数，而是增加了包装observer的过程的以及subscribe函数。
这个完善的subscribe作为new Observable传入的参数，并在constructor中绑到this上，好让new完后的对象有subscribe。这个对象最终就是create的返回结果了。

代码大概是这样写：
```javascript
class Observable {
    constructor(subscribe: Function){
    // 这个是包装好的subscribe，也是我们平时调用的subscribe
        this.subscribe = subscribe
    }
    static create(subscribe: Function) {
        return new Observable(function subscribe(observer: object){
        // observer是我们在subscribe时传入的那个对象,包装后实际执行next的地方就是subscriber中了
            var subscriber = new Subscriber(observer)   
            var subscription = subscribe(subscriber) //这里的subscribe是我们create时传入的那个参数
            subscription.unsubscribe = function unsubscribe(){}
            return subscription
        })
    }
}
```

### 2. Subject(主体)
实现了observable，要实现subject就简单多了。
首先subject也是observable的，所以它需要继承observable，不同指出在于它可以subscribe多个observer。所以需要在subject内部维护一个observers的数组，每subscribe一次，我们就需要在其中push一个，当执行next的时候，也不是this.observer.next，需要forEach observers都执行next。

> 请保留此份 Cmd Markdown 的欢迎稿兼使用说明，如需撰写新稿件，点击顶部工具栏右侧的 <i class="icon-file"></i> **新文稿** 或者使用快捷键 `Ctrl+Alt+N`。


## 操作符


