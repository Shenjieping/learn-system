function EventEmmiter() {
  this._events = {}
}

EventEmmiter.prototype.on = function(eventName, callback) {
  // 判断下是否存在
  this._events = this._events || Object.create(null); // 给调用者增加了个属性
  if (this._events['newListener']) {
    this._events['newListener'].forEach(fn => fn(eventName));
  }
  if (this._events[eventName]) {
    this._events[eventName].push(callback);
  } else {
    this._events[eventName] = [callback];
  }
}

EventEmmiter.prototype.off = function(eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName].filter(fn => {
      return fn !== callback;
    });
  }
}

EventEmmiter.prototype.emit = function(eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn.call(this, ...args);
    });
  }
}

EventEmmiter.prototype.once = function(eventName, callback) {
  
}

module.exports = EventEmmiter;