const fs = require('fs');

fs.readFile('./1.回调函数/name.txt', 'utf-8', function(err, data) {
  if (err) {
    console.log(err);
    return
  }
  newFn('name', data);
});

fs.readFile('./1.回调函数/age.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log(err);
    return
  }
  newFn('age', data);
});

// 使用后执行函数，让两个异步函数并发执行，最后返回执行的结果
function after(tiems, callback) {
  let result = {};
  return function(key, value) {
    result[key] = value;
    if (--tiems === 0) { // 利用闭包的计数器，当执行结束之后再调用callback函数
      callback(result);
    }
  }
}

let newFn = after(2, function(result) {
  console.log('....', result);
});