// promise A+ 规范

function Promise(exector) {
  this.state = 'pending'; // 初始值
  this.value = undefined; // 成功的初始值
  this.reason = undefined; // 失败的初始值
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
  function reject(reason) {
    if (self.state === 'pending') {
      self.state = 'rejected';
      self.reason = reason;
      self.onRejectCallback.forEach(fn => fn()); // 订阅模式，依次执行失败的回调函数
    }
  }
  try {
    exector(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果是循环引用就抛错
  if (promise2 === x) {
    reject(new TypeError('循环引用了'));
  }
  // 这种情况x 可能是一个Promise
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then; // 当前函数是否有then方法,有可能取then的时候报错
      if (typeof then === 'function') { // 是一个promise
          then.call(x, y => {
            resolve(y);
          }, r => {
            reject(r)
          }); // 用刚才取出的then方法调用，不要重复取值
      } else {
        resolve(x);
      }
    } catch (error) {
      reject(error);
    }

  } else {
    resolve(x);
  }

}

Promise.prototype.then = function (onfuifilled, onrejected) {
  let self = this;
  let promise2 = new Promise(function(resolve, reject) {
    if (self.state === 'fulfilled') {
      setTimeout(() => {
        try {
          let x = onfuifilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
    if (self.state === 'rejected') {
      setTimeout(() => {
        try {
          let x = onrejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
    if (self.state === 'pending') {
      // 如果是pending转态，也就是异步时，将成功或者失败的回调函数存入callback数组中，当回调结束后会依次调用成功或者失败的回调函数
      self.onResolveCallback.push(function() {
        try {
          setTimeout(() => {
            let x = onfuifilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        } catch (error) {
          reject(error);
        }
      });
      self.onRejectCallback.push(function() {
        try {
          setTimeout(() => {
            let x = onrejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        } catch (error) {
          reject(error);
        }
      });
    }
  })
  return promise2;
}

module.exports = Promise;