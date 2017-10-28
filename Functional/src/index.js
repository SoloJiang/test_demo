// 纯函数的可缓存性
var memoize = function (f) {
  var cache = {}
  return function () {
    var arg_str = JSON.stringify(arguments)
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments) // 缓存该函数
    return cache[arg_str] // 将该函数返回
  }
}

var pureFunction = memoize((x, y) => {
  return (function () {
    return {
      x,
      y
    }
  })()
})

console.log(pureFunction(1, 2))


