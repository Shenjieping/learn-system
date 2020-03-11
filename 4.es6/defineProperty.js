/*
let obj = {};

let other = '';
Object.defineProperty(obj, 'name', {
  enumerable: true, // 默认是不可以枚举的，也就是属性是隐藏的，不可见
  configurable: true, // 默认是不可以配置的，也就是不能使用delete删除属性
  // writable: true, // 是否可以重写，默认是不允许修改
  get() { // 读取方法
    console.log('读取')
    return other;
  },
  set(val) { // 设置方法
    console.log('设置属性')
    other = val;
  }
});
obj.name = '222'
console.log(obj.name);

// 简写

let obj2 = {
  other: '',
  get name() {
    console.log('get');
    return other;
  },
  set name(val) {
    console.log('set');
    other = val;
  }
}

obj2.name = '123455';
console.log(obj2.name);

*/

// 称为对象的getter和setter

// vue 的数据劫持, 把所有的属性都改为get 和set方法

function update() {
  console.log('更新视图');
}

let data = {
  name: 'shen',
  age: 18,
  location: {
    access: 'text'
  },
  address: [1, 2, 3]
};

function observer (obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  arrFn();
  // 循环添加劫持属性
  for (let key in obj) {
    defineReactive(obj, key, obj[key]);
  }
}
// 给每一个属性都添加 defineProperty
function defineReactive(obj, key, value) {
  observer(value); // 深度添加监听
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(val) {
      if(val !== value) {
        observer(val); // 如果值被赋值为对象，需要再次监听
        update(); // 改变值的时候更新视图
        value = val;
      }
    }
  })
}

observer(data);

// data.name = 'jie';
// data.location.access = 'xxx';
// data.location = {
//   access: 'ccc'
// };
// data.location.access = 'mmmm';
// data.address[0] = 2;
// console.log(data.address)
// data.address.push(2); // 操作数组无法监听，需要重写方法

function arrFn() {
  let methods = ['push', 'pop', 'shift', 'unshift', 'slice', 'sort', 'resverse'];
  methods.forEach(method => {
    let oldMethod = Array.prototype[method];
    Array.prototype[method] = function() {
      update();
      oldMethod.call(this, ...arguments);
    }
  });
}

data.address.push(2);
console.log(data.address);
