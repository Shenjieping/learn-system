const PENDING = 'pengding'; // 等待状态
const RESOLVED = 'resolved'; // 成功状态
const REJECTED = 'rejected'; // 失败状态

function MyPromise(fn) {
  const _this = this;
  _this.state = PENDING; // 初始状态
  _this.value = null;
  _this.resolveCallback = []; // 异步时存放的成功回调
  _this.rejectCallback = []; // 异步时存放的失败回调

  function resolve(value) { // 成功的回调
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (_this.state === PENDING) {
        _this.state = RESOLVED;
        _this.value = value;
        _this.resolveCallback.forEach(fn => fn(_this.value));
      }
    }, 0)
  }

  function reject(value) { // 失败的回调
    setTimeout(() => {
      if (_this.state === PENDING) {
        _this.state = REJECTED;
        _this.value = value;
        _this.rejectCallback.forEach(fn => fn(_this.value))
      }
    }, 0)
  }

  try {
    if (fn && typeof fn === 'function') {
      fn(resolve, reject);
    } else {
      resolve();
    }
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const _this = this;
  onFulfilled = typeof onFulfilled === 'function'
    ? onFulfilled
    : v => v;
  onRejected = typeof onRejected === 'function'
    ? onRejected
    : r => {
      throw r;
    };
  if (_this.state === PENDING) {
    let promise2 = new MyPromise((resolve, reject) => {
      _this.resolveCallback.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(_this.value);
            resolveProducer(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0)
      });
      _this.rejectCallback.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(_this.value);
            resolveProducer(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0)
      });
    });
    return promise2;
  }
  if (_this.state === RESOLVED) {
    onFulfilled(_this.value);
  }
  if (_this.state === REJECTED) {
    onRejected(_this.value);
  }
}

MyPromise.prototype.catch = function (onRejected) {
  this.then(null, onRejected);
}

function resolveProducer(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用了'));
  }
  if (x instanceof MyPromise) {
    x.then((value) => {
      resolveProducer(promise2, value, resolve, reject);
    }, reject);
  }
  let called = false;
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x,
          y => {
            if (called) {
              return;
            }
            called = true;
            resolveProducer(promise2, y, resolve, reject);
          }, r => {
            if (called) {
              return;
            }
            called = true;
            reject(r);
          })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) {
        return;
      }
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('111');
    reject('222');
  }, 1000);
});

p.then(res => {
  console.log(res);
})
.catch(err => {
  console.log(err);
})

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise;
