// 箭头函数
// 没有this，没有arguments

// this 问题， 看 . 前面是谁，就是谁

let a= 1;
let obj = {
  a: 2,
  fn() {
    setTimeout(() => {
      console.log(this.a);
    }, 0);
  }
};
obj.fn();