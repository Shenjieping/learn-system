setTimeout(() => {
  console.log('1');
  Promise.resolve().then(() => {
    console.log('2');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('3');
  setTimeout(() => {
    console.log('4');
  }, 0);
});

console.log('start'); // start 3 1 2 4

// 先执行宏任务 =》 再执行微任务
// 定时器，ajax 属于宏任务，Promise.then 是微任务
// 从node 11 之后就统一了

// 宏任务： (setImm)

// 微任务：then MutattionObserver MessagChannel

// js的主线程是单线程的。

/* 
进程和线程的关系

进程是计算机分配任务和调度任务的基本单位


 */