function after(times, callback) {
  return function() {
    if (--times === 0) {
      callback()
    }
  }
}

let newFn = after(3, function() {
  console.log('执行此函数');
});

newFn();
newFn();
newFn();