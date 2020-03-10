// 类数组，有长度，索引，是个对象，能呗迭代

// 给一个对象添加一个迭代器，使他能呗迭代

let obj = {
  0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function *() { // 自动生成一个迭代器
    let index = 0;
    while (index !== this.length) {
      yield this[index++]
    }
  }
}
let arr = [...obj];
console.log(arr);