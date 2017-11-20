/*
  实现简单的Promise
  Promise生命周期：
    pending state(挂起状态)--unsettled
    settled: 1. fulfilled 2. rejected

  内部属性：[[PromiseState]]: pending fulfilled rejected
          分别对应：_state: 0 1 2      
          完成过程中 发现 then 中的链式回调 也需要一个 state 去追踪状态才方便去执行队列

  Promise.then 存在于每一个 Promise 对象上 ，并且永久链式下去，
  接受两个参数 resolve, reject 分别接收 成功，失败 若只有一个参数，
  就监听完成。

  Promise.all 返回一个所有Promise结果的数组
  Promise.race 返回最快完成的Promise, 其他被忽略，但是依然被执行完

  需要捕捉 exception 需要 专门的 try catch 函数

  需要一个队列去收集 then 中的每一个函数
*/
'use strict';

Promise.prototype.then = function (onFulfilled) {
  // 这个过程 实际上 是把 Promise.resolve 传入 handle 并执行了 this.handle --- fn(resolve)
  // return new Promise((resolve) => {
  //   this.handle({
  //     onFulfilled: onFulfilled || null,
  //     resolve: resolve
  //   });
  // });
  // this.handle({
  //   onFulfilled: onFulfilled || null,
  //   resolve: this.resolve
  // })
  // return this
}

function Promise(fn) {
  var state = 0,
      value = null,
      callbacks = [];
  // handle 相当于 一个中间函数 将所有 then 中的函数 收集起来根据 state 的情况处理
  this.handle = function (callback) {
    // pending 的时候把 then 链 中的所有回调函数塞进
    if (state === 0) {
      callbacks.push(callback);
      return;
    }
  // 如果then中没有传递任何东西
    if(!callback.onFulfilled) {
      callback.resolve(value);
      return;
    }

    var ret = callback.onFulfilled(value);
    callback.resolve(ret);
  }

  
  this.resolve = newValue => {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;
      if (typeof then === 'function') {
        then.call(newValue, resolve);
        return;
      }
    }
    state = 1;
    value = newValue;
    setTimeout(() => {
      console.log(callbacks)
      callbacks.forEach(callback => {
        this.handle(callback);
      });
    }, 0);
  }

  fn(this.resolve);
}

var a = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('first')
    resolve(1)
  }, 1000);
})

a.then(val => {
  console.log(2)
}).then(val => {
  console.log(3)
}).then(val => {
  console.log(4)
}).then(val => {
  console.log(val)
}).then(val => {
  console.log(val)
})
