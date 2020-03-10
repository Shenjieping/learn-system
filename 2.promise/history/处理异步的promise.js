// promise A+ 规范

function Promise(exector) {
  this.state = 'pending'; // 初始值
  this.value = undefined; // 成功的初始值
  this.reson = undefined; // 失败的初始值
  this.onResolveCallback = []; // 存放成功的回调函数
  this.onRejectCallback = []; //存放失败的回调函数
  let self = this;
  function resolve(value) {
    if (self.state === 'pending') {
      self.state = 'fulfilled';
      self.value = value;
      self.onResolveCallback.forEach(fn => fn()); // 订阅模式，依次执行成功的回调
    }
  }
  function reject(reson) {
    if (self.state === 'pending') {
      self.state = 'rejected';
      self.reson = reson;
      self.onRejectCallback.forEach(fn => fn()); // 订阅模式，依次执行失败的回调函数
    }
  }
  exector(resolve, reject);
}

Promise.prototype.then = function (onfuifilled, onrejected) {
  let self = this;
  if (self.state === 'fulfilled') {
    onfuifilled(self.value);
  }
  if (self.state === 'rejected') {
    onrejected(this.reson);
  }
  if (self.state === 'pending') {
    // 如果是pending转态，也就是异步时，将成功或者失败的回调函数存入callback数组中，当回调结束后会依次调用成功或者失败的回调函数
    this.onResolveCallback.push(function() {
      onfuifilled(self.value);
    });
    this.onRejectCallback.push(function() {
      onrejected(self.reson);
    });
  }
}

module.exports = Promise;