function MyClass(attr1, attr2) {
  this.attr1 = attr1;
  this.attr2 = attr2;
}

class myClass extends ParentClass {
  constructor(attr) {
    this.attre = attr;
  }
  instanceMethod() {}
  static classMethod() {
    // logic not specidic to an instance
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class

// console logs global:
const arrow = () => {
  console.log(this);
};

// arrow functions override binding
const bound = arrow.bind({ name: "banana" });

// implicit returns using fat arrows
// ...

// ommitting parentheses
const double = (arg) => arg * 2;

// module.exports
// exports a single Object
module.exports = function () {
  console.log("im in export");
};
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// fetch:
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

// setup:
// https://open.appacademy.io/learn/ch---nov-2022-ny-cohort/javascript-project/setup
