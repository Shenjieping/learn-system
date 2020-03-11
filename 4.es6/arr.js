// es5 forEach, map, filter, some, every
// es6 find, findIndex
// es7 include

// reduce
// 求和
function sum () {
  let arr = [1, 2, 3, 4, 5];
  return arr.reduce((a, b) => a + b);
};
// console.log(sum());

function sum2() {
  let arr = [
    {price: 100, count: 2},
    {price: 200, count: 3},
    {price: 300, count: 4}
  ];
  return arr.reduce((a, b) => {
    return a + b.price * b.count;
  }, 0); // 指定第一项的值
}
// console.log(sum2());

// 合并两个数组为一个对象
function sub() {
  let keys = ['name', 'age'];
  let values = ['shen', 18];
  return keys.reduce((mome, current, index) => {
    mome[current] = values[index];
    return mome;
  }, {});
}
// console.log(sub());

// redux compose 就是通过reduce 实现的
function sum(a, b) {
  return a + b;
}
function toUpper(str) {
  return str.toUpperCase();
}
function add(str) {
  return '---' + str + '----';
}

// console.log(add(toUpper(sum('shen', '18'))));

function compose(...fns) {
  return (...args) => {
    let lastFn = fns.pop();
    return fns.reduceRight((a, b) => { // 使用反向求值
      return b(a);
    }, lastFn(...args));
  }
}

// let res = compose(add, toUpper, sum)('shen', '18');
// console.log(res);

// 正向求值
const compose2 = (...fns) => {
  return fns.reduce((a, b) => {
    return (...args) => {
      return a(b(...args));
    }
  });
}
// let res = compose2(add, toUpper, sum)('shen', '18');
// console.log(res);

// 实现一个reduce
Array.prototype.reduce = function(callback, prve) {
  // 获取数组
  for (let i = 0; i < this.length; i++) {
    if (prve === undefined) {
      prve = callback(this[i], this[i + 1], i + 1, this);
      i++;
    } else {
      prve = callback(prve, this[i], i, this);
    }
  }
  return prve
}
var arr = [1, 2, 3, 4, 5];
let res = arr.reduce((a, b) => {
  return a + b;
}, 0);

console.log(res);

// map 
let newArray = [1, 2, 3, 4].map(item => item * 2);
console.log(newArray)