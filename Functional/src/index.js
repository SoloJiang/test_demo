// 纯函数的可缓存性
// var memoize = function (f) {
//   var cache = {}
//   return function () {
//     var arg_str = JSON.stringify(arguments)
//     cache[arg_str] = cache[arg_str] || f.apply(f, arguments) // 缓存该函数
//     return cache[arg_str] // 将该函数返回
//   }
// }

// var pureFunction = memoize((x, y) => {
//   return (function () {
//     return {
//       x,
//       y
//     }
//   })()
// })

// console.log(pureFunction(1, 2))

/* 
一个对多个参数使用同一个函数处理的curry函数
@parma callback[, Any]
*/
function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
      return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function curry(fn, length) {
  length = length || fn.length;
  return function() {
//      console.log(Array.from(arguments))
      if (arguments.length < length) {
          var combined = [fn].concat(Array.from(arguments));
          return curry(sub_curry.apply(this, combined), length - arguments.length);
      } else {
          return fn.apply(this, arguments);
      }
  };
}

var fn = curry(function(a, b, c) {
  return [a, b, c];
});

fn("a")("b")("c")
