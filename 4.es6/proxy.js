// Object.defineProperty 不能监听数组的变化
// proxy 可以代理数组和对象

let arr = [1, 2, 3, 4];
let proxy = new Proxy(arr, {
  get(target, key) {
    console.log('get')
    // return target[key];
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    console.log('set');
    // target[key] = value;
    return Reflect.set(target, key, value);
  }
});

proxy[0] = 100;
proxy.push(5);
console.log(proxy[0]); // 获取代理后的值
