const Promise = require('./classPromise')
// const Promise = require('./promise1')


// new Promise().resolve(123).then(data => {console.log(data)});
let promise = new Promise(function(resolve, reject) {
  resolve('成功');
});

let p2 = promise
.then((data) => {
  console.log(data);
})
.then(data => {
  console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('456');
    }, 1000);
  });
}).then(data => {
  console.log(data)
  throw Error('出错了哦');
})
.catch(err => {
  console.log(err);
})