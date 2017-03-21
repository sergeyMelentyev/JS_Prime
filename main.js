"use strict";
var bar, baz;

            /* DATA TYPES */
// string, number, boolean, null, undefined = primitive values
// String, Number, Boolean, Array, Object, Function, RegExp, Data, Error = natives



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
x.length;       // will return number of arguments

// closure: func is able to access its lexical scope even when that func
// is executing outside its scope
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
    var privateData;
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
var module = ModOne(); module.doFirst();  // create new instance each time it called
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
}       // implicit binding
var bar = {
    a: "bar object",
    b: foo
};
bar.b();

function foo() {
    console.log(this.a);
}       // explicit binding with 'call' function
var bar = {
    a: "bar object"
};
var baz = function () {
    foo.call(bar);
};
baz(); setTimeout(baz, 100);

function foo(something) {
    console.log(this.a + " " + something);
    return this.a + something;
}   // explicit binding with 'apply' function
var bar = {
    a: "bar object"
};
var baz = function () {
    return foo.apply(bar, arguments);
};
baz("args");

function foo() {
    console.log(this.bar);
}       // explicit hard binding, 'this' reference cannot be changed
var objOne = { bar: "barOne" };
var orig = foo;
foo = function () { orig.call(objOne); };   // if 'foo' is called 'barOne' will be returned

function foo(baz, bam) {
    console.log(this.bar + " " + baz + " " + bam);
}       // explicit hard binding with 'bind' function
var obj = { bar: "bar" };
foo = foo.bind(obj, "baz");
foo("bam");     // bar baz bam

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



            /* OBJECT */
var objOne = { key: "value" };      // literal syntax

var objTwo = new Object(); objTwo.name = ""; objTwo.last = "";    // constructed syntax
Object.defineProperty(objTwo, "fullname", {
    get: function () {
        return this.name + " " + this.last;
    },
    set: function (value) {
        var temp = value.split(" ");
        this.name = temp[0]; this.last = temp[1];
    }
});

var bool = ("prop" in objOne);     // check if property is exist also included prototype link
objOne.hasOwnProperty("prop");      // check if property is exist only in that object

// function with constructor call
function Foo() { this.name = "name"; }
bar = new Foo();    // constructor call, return new obj and set this.name refer to it
bar = Foo();        // regular func call, return undefined and set this.name to global window obj


// iteration
for (var key in objOne) {
    // 'key' will show all keys, 'objOne[key]' all values
}
Object.keys(objOne);        // get array of keys

// utils
Object.defineProperty();
delete objOne.key;



            /* PROTOTYPES */
// prototype is an object, when function created, a prototype obj is created
// and attached to the function. If func is used as a constructor with new keyword
// created object has __proto__ property that pointing to the same prototype obj in func

// prototype of func is an obj instance that will become the prototype for all
// objects created using this func as a constructor
var myFunc = function () {};        // myFunc.prototype

// prototype of obj is the obj instance from which he obj is inherited
var myObj = {};     // myObj.__proto__

function Animal(voice) {
    this.voice = voice || "default";
}
Animal.prototype.teeth = "10";      // add property to prototype, will be inherited
Animal.prototype.speak = function () {
    console.log(this.voice);
};  // add function to prototype, wll be inherited

function Cat(name) {
    Animal.call(this, "not default");   // call 'Animal' constructor with args
    this.name = name;
}       // will inherit 'teeth' prop and 'speak' func
Cat.prototype = Object.create(Animal.prototype);    // assign 'Animal' as a prototype for 'Cat'
Cat.prototype.constructor = Cat;



            /* ARRAYS */
var array = [1, 2, 3, 4];
function makeArray() {
    return Array.prototype.slice.call(arguments);
}

funcName(array);      // passing array by reverence
funcName(array.slice());      // passing array by value

function predicateMap(v) {
    return v + v;
}       // call predicate func on each value in an array
[1,2,3,4].map(predicateMap);

function predicateFilter(v) {
    return v % 2 == 1;
}       // filer values, predicate must return boolean
[1,2,3,4].filter(predicateFilter);

function predicateCompose(x, y) {
    return x * y;
}   // reduction example
function compose(arr, predicate, init) {
    var temp = init;
    for (var i = 0; i < arr.length; i++)
        temp = predicate(temp, arr[i]);
    return temp;
}
compose([1,2,3,4], predicateCompose, 1);

function predicateForEach(eachValue) {
    // logic here
}       // call predicate func on each value
[1,2,3,4].forEach(predicateForEach);

// iteration over array
for (var i in array) {}     // will iterate over array index, not values
for (var j of array) {}     // will iterate over array values

var iterator = array[Symbol.iterator]();    // { value: 1, done: false }
iterator.next();



            /* UTILS */
if (typeof varName !== "undefined") {}  // use global var only if it exist

if (!Number.EPSILON) Number.EPSILON = Math.pow(2, -52); // compare floating point numbers
function closeToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}

function doSomething() {
    if (!APP.ready)
        return void setTimeout(doSomething, 100);   // try again later
    var result;     // do some stuff
    return result;
}       // wait until something is done
if (doSomething()) {
    // handle next task
}
