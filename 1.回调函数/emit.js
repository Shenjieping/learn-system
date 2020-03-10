// 发布订阅模式
const fs = require('fs');

fs.readFile('./1.回调函数/name.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log(err);
    return
  }
  e.emit(data, 'name');
});

fs.readFile('./1.回调函数/age.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log(err);
    return
  }
  e.emit(data, 'age')
});

function EmiterEvent() {
  this._arr = [];
}
// 订阅
EmiterEvent.prototype.on = function(callback) {
  this._arr.push(callback);
}
// 发布
EmiterEvent.prototype.emit = function() {
  this._arr.forEach(fn => fn.apply(this, arguments));
}

let e = new EmiterEvent();
let school = {};

e.on(function(data, key) {
  school[key] = data;
  console.log('...', school)
  if (Object.keys(school).length === 2) {
    console.log(school);
  }
});