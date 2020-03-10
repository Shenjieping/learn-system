// promise A+ 规范

function Promise(exector) {
  this.state = 'pending'; // 初始值
  this.value = undefined; // 成功的初始值
  this.reson = undefined; // 失败的初始值
  let self = this;
  function resolve(value) {
    if (self.state === 'pending') {
      self.state = 'fulfilled';
      self.value = value;
    }
  }
  function reject(reson) {
    if (self.state === 'pending') {
      self.state = 'rejected';
      self.reson = reson;
    }
  }
  exector(resolve, reject);
}

Promise.prototype.then = function (onfuifilled, onrejected) {
  let self = this;
  // 当成功的时候调用成功的方法
  if (self.state === 'fulfilled') {
    onfuifilled(self.value);
  }
  // 当失败的时候调用失败的方法
  if (self.state === 'rejected') {
    onrejected(this.reson);
  }
}

module.exports = Promise;