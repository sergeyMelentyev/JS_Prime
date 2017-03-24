"use strict";
            /* DATA TYPES */
// typeof operator
// string, number, boolean, null, undefined = primitive values
// String, Number, Boolean, Array, Object, Function, RegExp, Data, Error = natives



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
// if func called with "new" (new binding), this = newly constructed object
// if func called with "call" or "apply" (explicit binding), this = explicitly specified object
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
}       // explicit binding with "call" function
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
}   // explicit binding with "apply" function
var bar = {
    a: "bar object"
};
var baz = function () {
    return foo.apply(bar, arguments);
};
baz("args");

function foo() {
    console.log(this.bar);
}       // explicit hard binding, "this" reference cannot be changed
var objOne = { bar: "barOne" };
var orig = foo;
foo = function () { orig.call(objOne); };   // if "foo" is called "barOne" will be returned

function foo(baz, bam) {
    console.log(this.bar + " " + baz + " " + bam);
}       // explicit hard binding with "bind" function
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
    // "key" will show all keys, "objOne[key]" all values
}
Object.keys(objOne);        // get array of keys

// utils
Object.defineProperty();
delete objOne.key;



            /* PROTOTYPES */
function Human(arg) {
    // func will create arbitrary labeled "object"
    // "Foo.prototype" will point (link) to that "object"
    // "object.constructor" will point (link) back to "Foo"
    this.name = arg;
}
Human.prototype.propName = "";      // put property directly on arbitrary labeled "object"
    // will be referenced by all objects

var men = new Human("S");
var female = new Human("O");
// a. new obj is created
// b. that obj get linked via [[Prototype]] to the arbitrary labeled "object"
    // the same that "Human.prototype" points to
// c. context get set to that new obj, "Human this.name" will be pointing to that obj
// d. obj is being returned and assign to variable "men"
men.propValue = "";     // put property directly on that "men" object

men.constructor === Human;      // true, "men" does not have that prop, will walk up the
    // prototype chain via private [[Prototype]] link to the arbitrary labeled "object"
    // that has ".constructor" property pointing to the "Human" function
men.constructor === female.constructor;     // true, both points to the "Human" function
men.__proto__ === Human.prototype;      // true, "men" does not have that function,
    // will walk up the prototype chain via private [[Prototype]] link to the the arbitrary
    // labeled "object" that also does not have that function, will walk up to the system
    // arbitrary labeled "object" and call that func. It will return internal prototype
    // linkage [[Prototype]] of called obj, in this case "men"

function Animal(voice) {
    this.voice = voice || "default";
}
Animal.prototype.teeth = "10";      // add property to prototype, will be inherited
Animal.prototype.speak = function () {
    console.log(this.voice);
};  // add function to prototype, wll be inherited

function Cat(name) {
    Animal.call(this, "not default");   // call "Animal" constructor with args
    this.name = name;
}       // will inherit "teeth" prop and "speak" func
Cat.prototype = Object.create(Animal.prototype);    // assign "Animal" as a prototype for "Cat"
Cat.prototype.constructor = Cat;



            /* BEHAVIOR DELEGATION */
var Foo = {
    init: function(who) {
        this.me = who;
    },
    identify: function() {
        return "I am " + this.me;
    }
};
var Bar = Object.create(Foo);
Bar.speak = function () {
    console.log("Hello, " + this.identify() + ".");
};
var bam = Object.create(Bar);
bam.init("S");
bam.speak();



            /* ARRAYS */
var array = [1, 2, 3, 4];
function makeArray() {
    return Array.prototype.slice.call(arguments);
}

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
