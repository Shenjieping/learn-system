// 类数组，有长度，索引，是个对象，能呗迭代

// 给一个对象添加一个迭代器，使他能呗迭代

let obj = {0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]:  function() {
  let index = 0;
  let self = this;
  return {
    next() {
      return {value: self[index], done: index++ === self.length};
    }
  };
}}
let arr = [...obj];
console.log(arr);