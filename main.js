"use strict";
var object = {a: "a", b: 34};      // object.a; object["b"];
var array = ["a", 34];      // array[i];


            /* NAMESPACE */
var anyLibName = {
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

function process(bigData){}     // engine will remove block-scoping after executing
{
    let bigData = {};
    process(bigData);
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

function User() {
    var username, password;
    function doLogin(user, pw) {    // 'doLogin()' inner func has a closure over vars
        username = user;
        password = pw;
    }
    var publicAPI = {
        login: doLogin
    };
    return publicAPI;
}       // closure in module pattern example
var userOne = User();   // create new instance of the 'User' module and assign to ref var
userOne.login("name", 1234);


            /* THIS POINTER */
function foo() {
    //console.log(this.bar);
}
var obj1 = {
    bar: "obj1",
    foo: foo
};
var obj2 = {
    bar: "obj2"
};
obj1.foo();
foo.call(obj2);


            /* PROTOTYPES */
var a = {
    name: "first",
    last: "last"
};
var b = Object.create(a);   // create prototype link, now 'b' has all properties from 'a'
b.name = "new";     // 'b' can change properties in 'a' obj, but not in reverse

