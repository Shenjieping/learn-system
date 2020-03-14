// 装饰器 -- 可以修饰类，类的属性，类的原型上的方法

// @flag
class Animal {
  PI = 3.14;
  name = 'xx';
  @before
  say() {
    console.log('test')
  }
}
// 装饰器，需要安装插件 @babel/plugin-proposal-decorators
// function flag(constructor) { // 类的静态属性
//   constructor.type = 'flag';
// }
// console.log(Animal.type);

// 添加原型上的属性
function readOnly(targt, property, option) {
  setTimeout(() => {
    console.log(targt, Animal.prototype); // 类的原型
  }, 0);
  option.writable = false;
  /*
  {
  '0': Animal {},
  '1': 'PI',
  '2':
   { configurable: true,
     enumerable: true,
     writable: true,
     initializer: [Function: initializer] } }
  */
}
let ani = new Animal();
// ani.PI = 3.5;

// 在函数执行前加上执行函数
function before(target, property, options) {
  let oldSay = options.value;
  options.value = function() {
    console.log('before');
    oldSay.call(target, ...arguments);
  }
}

ani.say();