Function.prototype.before = function(callback) {
  let self = this;
  return function() {
    callback();
    self.apply(self, arguments); //before 的参数
  }
}
function fn (val) {
  console.log('执行原函数' + val);
}

let newFn = fn.before(function() {
  console.log('在之前执行的函数');
})

newFn('hello');