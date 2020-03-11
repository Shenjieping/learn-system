// 是两种存储结构
// set 集合,不能放重复的东西
let s = new Set([1, 2, 3, 1, 2,3]);
console.log(s);
console.log(typeof s); // object
console.log([...s]); // 将set转为数组 // Symbol.iterator

s.add('23'); // 往集合里添加元素
s.delete(1); // 删除数据
console.log(s);

// console.log(s.values());
// for (let key of s) {
//   console.log(key);
// }

// 集合，并集，交际，差集
let s01 = [1, 2, 3, 1, 2, 6];
let s02 = [1, 2, 3, 4, 5, 4, 5];
// 并集
function union() {
  return [...new Set([...s01, ...s02])];
}
console.log(union());
// 交集
function inters() {
  return [...new Set(s01)].filter(item => {
    return new Set(s02).has(item);
  });
}
console.log(inters());
// 差集
function diff() {
  return [...new Set(s01)].filter(item => {
    return !new Set(s02).has(item);
  })
}
console.log(diff());

// -----------map-----------------

// map是有key 的,不能放重复的key
let m = new Map();
m.set('name', 'shen');
let obj = {name: 'jie'};
m.set(obj, '123');
obj = null;
console.log(m);