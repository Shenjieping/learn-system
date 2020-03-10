// 观察者模式
// 基于发布订阅模式

// 创建一个观察者
class Observer {
  constructor(who) {
    this.who = who;
  }
  // 通知观察者更新了转态
  update(newState) {
    console.log(this.who + newState);
  }
}

// 创建一个被观察者
class Object {
  constructor() {
    this.state = '开心'; // 默认的状态
    this.arr = []; // 订阅函数队列
  }
  // 存储观察者的函数
  attach (observer) {
    this.arr.push(observer);
  }
  // 更新状态
  setState (newState) {
    this.state = newState;
    this.arr.forEach(observer => observer.update(newState))
  }
}

// 创建一个被观察者实例
const object = new Object();
// 创建多个观察者
const my1 = new Observer('沈');
const my2 = new Observer('杰');

// 将观察者挂到被观察者上
object.attach(my1);
object.attach(my2);

// 更新状态
object.setState('生气');