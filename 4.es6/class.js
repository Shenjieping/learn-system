// ES5的构造函数

/*
function Animal(name) {
  this.name = name;
  this.arr = [1, 2, 3];
}
let a1 = new Animal('111');
let a2 = new Animal('222');

console.log(a1.arr === a2.arr); // false

Animal.prototype.address = {localtion: '山里'};
console.log(a1.address === a2.address); // true

// 每个实例是都有一个__proto__ 指向所属类的原型
console.log(a1.__proto__ === Animal.prototype);
// 每个实例的构造函数指向当前函数
console.log(a1.constructor === Animal)

console.log(Animal.__proto__ === Function.prototype);
console.log(a1.__proto__.__proto__ === Object.prototype);
*/

function Animal(name) {
  this.name = name;
  this.arr = [1, 2, 3];
}
Animal.prototype.address = { localtion: '山里' };

function Tiger(name) {
  this.name = name;
  this.age = 18;
  Animal.call(this); // 继承父类实例上的属性
}
// 继承父类的公共方法或者属性
// Tiger.prototype.__proto__ = Animal.prototype;

Tiger.prototype = Object.create(Animal.prototype);
Tiger.prototype.say = function() {
  console.log('speak');
}

let tiger = new Tiger();

console.log(tiger.arr);
console.log(tiger.address);