// 对象展开运算符 ...
// 1）合并数组

// let arr1 = [1, 2, 3];
// let arr2 = [4, 5, 6];
// console.log([...arr1, ...arr2]);

// 2) 合并对象

// let obj1 = {name: 'shenjieping'};
// let obj2 = {age: 18};
// console.log({...obj1, ...obj2});

// 展开运算符是一个浅拷贝，只能拷贝一层
// ... 类似于 Object.assign()

// 自己实现一个深拷贝
// 判断数据的类型，typeof instenceof, Object.prototype.toString.call, constructor
function deepClone(obj) {
  if (obj == null) return obj;
  if (obj instanceof Date) return new Data(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== 'object') return obj;

  let cloneObje = new obj.constructor; // 找出构造函数 Array => [], Object => {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) { // 判断key 是否存在
      cloneObje[key] = deepClone(obj[key]); // 简单深拷贝，没有考虑循环引用问题
    }
  }
  return cloneObje;
}

// let obj = {age: 18, name: {name: 'sss'}};
// let res = deepClone(obj);
// obj.name.name = 'bbbb';
// console.log(res);

// 使用weakMap 处理循环引用的问题
function deepClone2(obj, hash = new WeakMap()) {
  if (obj == null) return obj;
  if (obj instanceof Date) return new Data(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== 'object') return obj;

  if (hash.has(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor; // 找出构造函数 Array => [], Object => {}
  // 如果是对象，就放在weakMap中，如果再拷贝时就存在此对象
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) { // 判断key 是否存在
      cloneObj[key] = deepClone2(obj[key], hash);
    }
  }
  return cloneObj;
}

// let obj = {name: 'shen', age: {name: 'jie'}};
// obj.weak = obj;

// let res = deepClone2(obj);
// obj.age.name = 'xxx';
// console.log(res);


function clone1(obj, hash = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (hash.has(obj)) return hash.get(obj);

  let cloneObj = new obj.constructor;
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = clone1(obj[key], hash);
    }
  }
  return cloneObj;
}

let obj = {name: '112', age: {name: '22'}, c: {}};
obj.c.d = obj.age;
let res = clone1(obj);
obj.age.name = '999';
console.log(res);