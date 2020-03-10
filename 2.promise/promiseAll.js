const fs = require('fs');
const Promise = require('./classPromise.js');


// Promise.all = function(values) {
//   return new Promise((resolve, reject) => {
//     let arr = [];
//     let count = 0;
//     const processData = function (key, value) {
//       count++;
//       arr[key] = value;
//       if (count === values.length) {
//         resolve(arr);
//       }
//     }
//     for (let i = 0; i < values.length; i++) {
//       let current = values[i];
//       let then = current.then;
//       if (then && typeof then === 'function') {
//         then.call(current, y => {
//           processData(i, y);
//         }, reject);
//       } else {
//         processData(i, current);
//       }
//     }
//   })
// }

// Promise.race = function(values) {
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < values.length; i++) {
//       let current = values[i];
//       let then = current.then;
//       if (then && typeof then === 'function') {
//         then.call(current, y => {
//           resolve(y);
//         }, r => {
//           reject(r);
//         })
//       } else {
//         resolve(current);
//       }
//     }
//   })
// }

// function read(url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, 'utf8', (err, data) => {
//       if (err) return reject(err);
//       resolve(data);
//     });
//   });
// }

let read = new Promise().promisify(fs.readFile);

read('./2.promise/name.txt', 'utf8').then(data => {
  console.log(data);
})

// new Promise().all([read('./2.promise/name.txt'), read('./2.promise/age.txt'), 1, 2, 3])
//   .then(res => {
//     console.log(res);
//   });

// new Promise().race([read('./2.promise/name.txt'), read('./2.promise/age.txt')])
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });