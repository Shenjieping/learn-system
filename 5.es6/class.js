class Animal {
  constructor() {
    this.age = 10;
  }
  static test = 24;
  name () {

  }
}

// npm init -y
// npm install -D @/babel/cli
// npm install -D @/babel/core babel的核心包，主要是转化代码


// babel-preset-es2015 主要是转化es6，现在已经不需要了
// bebel-preset-stage-0 转化未定义的语法，比如装饰器，现在已经废弃了

// npm install -D @babel/preset-env 转化已定案的标准语法
// @babel/plugin-proposal-class-properties 主要用来转化类的属性

// npx babel class.js -o es5.js -w
