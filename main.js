"use strict";

            /* NAMESPACE */
var libOne = {
    a: "stuff",
    b: function (arg) {
        // logic here
    }
};  // single var declaration, used as namespace



            /* SCOPE */
window.a = 0;   // global vars are props of the global scope
var varA;       // will stick only to function scope
let varB;       // will stick to any block scope
const varC = 0;     // constant value will stick to any block scope

function funcOne(bigData){}     // engine will remove block-scoping after executing
{
    let bigData = {};
    funcOne(bigData);
}



            /* LOOPS AND ITERATIONS */
var array = [1, 2, 3, 4];
for (var v of array) {}

var iterator = array[Symbol.iterator]();    // { value: 1, done: false }
iterator.next();



            /* FUNCTIONS & CLOSURE */
(function (global) {
    // logic here
})(window);     // immediately invoked anonymous func expression
(function (def) {
    def(window);
})(function def(global) {
    // logic here
});     // the same but inverted

var x = (function () { return 10; })();     // the same as lambda expression

// closure: func is able to access its lexical scope even when that func is executing outside its scope
function outerOne() {
    var a = 2;
    function innerOne() {
        // logic here
    }
    return innerOne;
}   // return reference of the innerOne() func object
var varD = outerOne(); varD();

function outerTwo() {
    var a  = 2;
    function innerTwo() {
        // logic here
    }
    outerThree(innerTwo);
}   // pass reference of the innerTwo() func object
function outerThree(arg) {
    arg();
}



            /* MODULES */
function ModOne() {
    var privatDataVars;
    function doFirst() {
        // logic here
    }
    function doSecond() {
        // logic here
    }
    return {
        doFirst: doFirst,
        doSecond: doSecond
    }
}
var module = funcOne(); module.doFirst(); module.doSecond();  // create new instance each time it called

var singleton = (function Singleton () {
    // logic here the same as in Module()
})();   // create one instance



            /* THIS POINTER */
// if func called with 'new' (new binding), this = newly constructed object
// if func called with 'call' or 'apply' (explicit binding), this = explicitly specified object
// if func called with a context (implicit binding), this = context object
// otherwise default binding to undefined in strict mode or global object

function foo() {
    console.log("Call from foo function: " + this.a);
}   // implicit binding (default)
var bar = {
    a: "bar object",
    b: foo
};
bar.b();

function foo() {
    console.log("Call from foo function: " + this.a);
}   // explicit and strong binding (hard binding)
var bar = {
    a: "bar object"
};
var baz = function () {
    foo.call(bar);
};
baz(); setTimeout(baz, 100);

function foo(something) {
    console.log("Call from foo function " + this.a + " " + something);
    return this.a + something;
}
var bar = {
    a: "bar object"
};
var baz = function () {
    return foo.apply(bar, arguments);
};
baz("args");

function foo(something) {
    console.log("Call from foo: " + this.a + " "+ something);
}   // explicit and strong binding with bind() helper func
var obj = {
    a: "object"
};
var baz = foo.bind(obj); baz("args");

function foo(a) {
    this.a = a;
}   // new binding
var baz = new foo(2);

function foo() {
    var self = this;
    setTimeout(function () {
        console.log("Call foo() " + self.a);
    }, 1000);
}       // use case with setTimeout function
var obj = {
    a: "object"
};
foo.call(obj);



            /* OBJECTS */
var objOne = { key: "value" };      // literal syntax
var objTwo = new Object(); objTwo.key = "value";    // constructed syntax

var bool = ("prop" in objOne);     // check if property is exist also included prototype link
objOne.hasOwnProperty("prop");      // check if property is exist only in that object

var objThree = {
    get a() {
        return this._a_;
    },
    set a(val) {
        this._a_ = val * 2;
    }
};      // property setters and getters




            /* PROTOTYPES */
var a = {
    name: "first",
    last: "last"
};
var b = Object.create(a);   // create prototype link, now 'b' has all properties from 'a'
b.name = "new";     // 'b' can change properties in 'a' obj, but not in reverse















/* page 200
 var MyModules = (function Manager() {
 var modules = {};
 function define(name, deps, impl) {
 for(var i = 0; i < deps.length; i++) {
 deps[i] = modules[deps[i]];
 }
 modules[name] = impl.apply(impl,deps);
 }
 function get(name) {
 return modules[name];
 }
 return {
 define: define,
 get: get
 };
 })();
 MyModules.define("bar", [], function () {
 function hello(who) {
 return "My name is " + who;
 }
 return {
 hello: hello
 };
 });
 MyModules.define("foo", ["bar"], function (bar) {
 var name = "Sergey";
 function awesome() {
 console.log(bar.hello(name).toUpperCase());
 }
 return {
 awesome: awesome
 };
 });

 var bar = MyModules.get("bar");
 var fee = MyModules.get("foo");
 fee.awesome();
 */
