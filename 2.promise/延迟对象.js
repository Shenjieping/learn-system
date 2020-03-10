const Promise = require('./classPromise');
const fs = require('fs');

// 包装成一个Promise对象
function read() {
  return new Promise((resolve, reject) => {
    fs.readFile('./2.promise/name.txt', 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function read2() {
  // 延迟对象，就不用嵌套一层Promise
  let defer = Promise.deferred();
  fs.readFile('./2.promise/name.txt', 'utf8', (err, data) => {
    if (err) {
      return defer.reject(err);
    }
    return defer.resolve(data);
  });
  return defer.promise;
}

read2().then(data => {console.log(data)});