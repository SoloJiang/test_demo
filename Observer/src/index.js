const Obsever = (function () {
  let message = {}; // 将消息容器作为私有变量，防止被污染
  return {
    regist (type, fn) {
      if (message[type] === undefined) {
        message[type] = [fn];
      } else {
        message[type].push(fn); // 若该类事件被注册过，则将函数推入执行序列
      }
      console.log('You han regist ' + type + ' 类型的 ' + fn.name + ' 事件');
    },
    fire (type, info) {
      if (message[type] === undefined || !(message[type] instanceof Array)) return;
      let len = message[type].length;
      message[type].forEach(fn => {
        fn(info)
      });
    },
    cancel (type, fn) { 
      if (message[type] !== undefined && message[type] instanceof Array) {
        let len = message[type].length;
        message[type].forEach((item, index) => {
          if (item === fn) { // 为了完成对象之间的解耦，能取消注册的函数必须就是注册的函数
            message[type].splice(index, 1);
            console.log('You had remove ' + fn.name);
          }
        })
      }
    } 
  }
})();
var obj = {
  say () {
    console.log('Hi~');
  }
}
Obsever.regist('onsay', obj.say);

Obsever.fire('onsay');

Obsever.cancel('onsay', obj.say);
