/*
  实现简单的Promise
  Promise生命周期：
    pending state(挂起状态)--unsettled
    settled: 1. fulfilled 2. rejected

  内部属性：[[PromiseState]]: pending fulfilled rejected

  Promise.then 存在于每一个 Promise 对象上 ，并且永久链式下去，
  接受两个参数 resolve, reject 分别接收 成功，失败 若只有一个参数，
  就监听完成。

  Promise.all 返回一个所有Promise结果的数组
  Promise.race 返回最快完成的Promise, 其他被忽略，但是依然被执行完
*/