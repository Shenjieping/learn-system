class Promise {
  constructor(exector) {
    this.state = 'pending'; // 初始值
    this.value = undefined; // 成功的初始值
    this.reason = undefined; // 失败的初始值
    this.onResolveCallback = []; // 存放成功的回调函数
    this.onRejectCallback = []; //存放失败的回调函数
    try {
      exector(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  static _resolve(value) {
    if (value instanceof Promise) {
      return value.then(this._resolve, this._reject);
    }
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
      this.onResolveCallback.forEach(fn => fn());
    }
  }

  static _reject (reason) {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
      this.onRejectCallback.forEach(fn => fn());
    }
  }
  // 一上来就调用成功或者失败
  resolve (value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }

  reject (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  then(onfulfilled, onrejected) {
    // 值的穿透，当then或者catch 所传的不是一个函数，则忽略
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
    onrejected = typeof onrejected === 'function' ? onrejected : err => {throw err};
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        try {
          setTimeout(() => {
            const x = onfulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          }, 0);
        } catch (error) {
          reject(error);
        }
      }
      if (this.state === 'rejected') {
        try {
          setTimeout(() => {
            const x = onrejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          }, 0);
        } catch (error) {
          reject(error);
        }
      }
      if (this.state === 'pending') {
        this.onResolveCallback.push(() => {
          try {
            setTimeout(() => {
              const x = onfulfilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            }, 0);
          } catch (error) {
            reject(reject);
          }
        })
        this.onRejectCallback.push(() => {
          try {
            setTimeout(() => {
              const x = onrejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            }, 0);
          } catch (error) {
            reject(error);
          }
        })
      }
    })
    return promise2;
  }

  catch (onrejected) {
    this.then(null, onrejected);
  }

  // 这个方法要兼容别人的Promise，当调用成功后不能再调用失败
  resolvePromise (promise2, x, resolve, reject) {
    if (promise2 === x) {
      reject(new TypeError('循环引用了'));
      return;
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      let called = false;
      // 可能是一个Promise
      try {
        const then = x.then; // {then: '212'}
        if (typeof then === 'function') {
          then.call(x, y => {
            // resolve(y);
            if (called) return; // 防止调用成功又调用失败
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, r => {
            if (called) return; // 防止调用失败后又调用成功
            called = true;
            reject(r);
          })
        } else {
          resolve(x);
        }
      } catch (error) {
        if (called) return; // 防止出错后还在继续调用成功
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  }

  all(values) {
    let arr = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      if (!values) {
        reject(new TypeError('values is empty'));
      } else if (!values instanceof Array) {
        reject(new TypeError('values is not a Array'));
      }
      for (let i = 0; i < values.length; i++) {
        let current = values[i];
        let then = current.then;
        if (then && typeof then === 'function') {
          then.call(current, y => {
            arr[i] = y;
            if (++count === arr.length) {
              resolve(arr);
            }
          }, r => reject(r));
        } else {
          arr[i] = current;
          if (++count === arr.length) {
            resolve(arr);
          }
        }
      }
    })
  }

  race(values) {
    return new Promise((resolve, reject) => {
      if (!values) {
        reject(new TypeError('values is empty'));
      } else if (!values instanceof Array) {
        reject(new TypeError('values is not a Array'));
      }
      for (let i = 0; i < values.length; i++) {
        let current = values[i];
        let then = current.then;
        if (then && typeof then === 'function') {
          then.call(current, y => {
            resolve(y);
          }, r => {
            reject(r);
          });
        } else {
          resolve(current);
        }
      }
    })
  }

  // 将方法promise化
  promisify (fn) {
    return (...args) => {
      return new Promise((resolve, reject) => {
        fn(...args, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
    }
  }
}

// https://github.com/promises-aplus/promises-tests
// 测试Promise是否符合Promise A+ 规范
// 安装： npm install -g promises-aplus-tests
// 使用： promises-aplus-tests 文件名
Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise;