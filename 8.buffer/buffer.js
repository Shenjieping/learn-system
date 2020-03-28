// 在node中一个汉字占3个字节

console.log(Buffer.alloc(6)); // 获取6个干净的字节
console.log(Buffer.allocUnsafe(6)); // 回去任意6个字节

console.log(Buffer.from('沈'));
console.log(Buffer.from([1, 2, 3]))

let buf = Buffer.from('沈');
console.log(buf.toString('base64'));
