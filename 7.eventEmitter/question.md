## 进程和线程的区别
一个进程中可以有多个线程，比如渲染线程，js引擎线程，HTTP，请求线程等。进程表示一个程序，线程是进程中的单位

- 多线程在单核cpu中其实也是顺序执行的，不过西戎可以帮你切换到哪个执行而已，没有提高速度
- 多个cup可以再多个cup中同事执行
- webworker 工作线程

> 单线程的有点：解决切换上下文时间，锁的问题，节约内存
> node 开一个主进程，在开多个子进程

## 宏任务和微任务
- 微任务： process.nextTick（node）, promise.then, MutationObserver
- 宏任务：js代码，setTimeout, setInterval, setImmediate（node IE）, MessageChannel, I/O（文件读写）, UI, rendering.

## node 事件循环
- timers阶段 setTimeout setInterval
- poll阶段 （回到timer 阶段执行回调并且执行 I/O回调）,fs.readFile
    poll 队列为空，有check 阶段会进入check阶段
- check阶段 setImmediate

> setTimeout setImmediate 哪个时间快，不一定，看进屋时间循环的时间，是都叨叨需要执行的时间
> IO 的下一个阶段是check阶段


