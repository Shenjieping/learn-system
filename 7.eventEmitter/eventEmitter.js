let EventEmmiter = require('./events');
let util = require('util');
// on 绑定事件，emit 发射事件

// 绑定原型
// __proto__
// Object.create
// Object.setPeototypeOf

function Gral() {

}

util.inherits(Gral, EventEmmiter);
let gral = new Gral()

gral.on('newListener', (type) => {
  console.log(type);
})

let cary = (val) => {
  console.log('---', val);
}
gral.on('testMessage', cary);
gral.on('testMessage', cary);
gral.on('testMessage', cary);

// gral.off('testMessage', cary); // node 10+ 之前叫removeListener

// gral.emit('testMessage', {
//   test: 112
// });