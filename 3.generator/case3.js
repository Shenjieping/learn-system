const fs = require('mz/fs');
const co = require('co');


function *read() {
  let name = yield fs.readFile('./3.generator/name.txt', 'utf8');
  let age = yield fs.readFile(name, 'utf8');
  let res = [age];
  return res;
}

let res = co(read());

res.then(res => {
  console.log(res);
});

// async 就是Generator + co