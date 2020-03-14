"use strict";

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

// 装饰器 -- 可以修饰类，类的属性，类的原型上的方法
// @flag
var Animal = (_class = (_temp = /*#__PURE__*/function () {
  function Animal() {
    _classCallCheck(this, Animal);

    this.PI = 3.14;
    this.name = 'xx';
  }

  _createClass(Animal, [{
    key: "say",
    value: function say() {
      console.log('test');
    }
  }]);

  return Animal;
}(), _temp), (_applyDecoratedDescriptor(_class.prototype, "say", [before], Object.getOwnPropertyDescriptor(_class.prototype, "say"), _class.prototype)), _class); // 装饰器，需要安装插件 @babel/plugin-proposal-decorators
// function flag(constructor) { // 类的静态属性
//   constructor.type = 'flag';
// }
// console.log(Animal.type);
// 添加原型上的属性

function readOnly(targt, property, option) {
  setTimeout(function () {
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

var ani = new Animal(); // ani.PI = 3.5;
// 在函数执行前加上执行函数

function before(target, property, options) {
  var oldSay = options.value;

  options.value = function () {
    console.log('before');
    oldSay.call(target);
  };
}

ani.say();
