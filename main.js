(function (dataTypes) {
    "use strict";
    typeof null;            // "object"
    typeof foo;             // "undefined"
    typeof "foo";           // "string"
    typeof 123;             // "number"
    typeof true;            // "boolean"
    typeof {a:1};           // "object"
    typeof function () {};  // "function"
})();
(function (coercion) {
    "use strict";

    var str = "123", val;
    // explicit from string to number
    val = parseInt(str, 10); val = Number(str); val = +str;
    // implicit from string to number
    val = str - 0; val = str - "0"; val = str / 1;

    var num = 123;
    // explicit from number to string
    str = num.toString(); str = String(num);
    // implicit from number to string
    str = num + "";

    // from string/number to boolean
    var bool = Boolean(str); bool = !!str; bool = str ? true : false;
})();
(function (scope) {
    "use strict";
    window.a = 0;       // global vars are props of the global scope
    var one;        // will stick only to function scope
    let two;        // will stick to any block scope
    const three = 0;    // constant value will stick to any block scope, like let

    function funcOne(bigData){}     // engine will remove block-scoping after executing
    {
        let bigData = {};
        funcOne(bigData);
    }
})();
(function (functionAndClosure) {
    "use strict";
    function name() {}         // function declaration, will be hoisted
    var x = function () {};     // function expression, will not be hoisted
    var size = x.length;        // will return number of arguments

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
})();
(function (thisPointer) {
    "use strict";
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

    var widget = {
        init: function () {
            var self = this;
            document.addEventListener('click', function (event) {
                self.doSomething(event.type);
            }, false);
        },
        doSomething: function (type) {
            console.log(type);
        }
    };      // use case with document.addEventListener()
})();
(function (array) {
    "use strict";
    var arr = [1, 2, 3, 4];
    function makeArray() {
        return Array.prototype.slice.call(arguments);
    }

    arr.push(5);      // add to the end, return value will show new length
    arr.unshift(5);   // add to the front
    arr.pop();        // remove the last one element
    arr.shift();      // remove the fist one element

    arr.splice(arr.indexOf(3), 1);  // remove exact value '3' by index position

    func(array);                // passing array by reference
    func(array.slice());        // passing array by value

    function predicateMap(v) {
        return v + v;
    }       // call predicate func on each value in an array
    [1,2,3,4].map(predicateMap);        // no side effect, will return new array

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

    function predicateForEach(item, index, array) {
        // logic here
    }   // call predicate func on each value
    [1,2,3,4].forEach(predicateForEach);        // with side effect, will change initial array

    // iteration over array
    for (var i in arr) {}     // will iterate over array index, not values
    for (var j of arr) {}     // will iterate over array values

    var iterator = arr[Symbol.iterator]();    // { value: 1, done: false }
    iterator.next();
})();
(function (object) {
    "use strict";
    // create a new object
    var obj = {};
    var obj = Object.create(null);
    var obj = new Object();

    // add key-value pare
    obj.key = "";
    obj['key'] = "";
    Object.defineProperty(obj, 'key', {
        value: "",
        writable: true,
        enumerable: true,
        configurable: true
    });
    Object.defineProperties(obj, {
        'keyOne': {
            value: "",
            writable: true
        },
        'keyTwo': {
            value: "",
            writable: true
        }
    });

    var bool = ("key" in obj);      // check if property is exist also included prototype link
    obj.hasOwnProperty("key");      // check if property is exist only in that object
    delete obj.key;         // delete 'value' by targeting its 'key' from obj

    // iterate over object
    for (var key in obj) {
        // "key" will show all keys, "objOne[key]" all values
    }
    Object.keys(obj);        // get array of keys
})();
(function (prototype) {
    "use strict";
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
    // new obj is created;
    // that obj get linked via [[Prototype]] to the arbitrary labeled "object"
        // the same that "Human.prototype" points to;
    // context get set to that new obj, "Human this.name" will be pointing to that obj;
    // obj is being returned and assign to variable "men";
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
})();
(function (behaviorDelegation) {
    "use strict";
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
})();
(function (designePatterns) {
    "use strict";
    // function constructor pattern
    function Car(model, year, km) {
        this.model = model;
        this.year = year;
        this.km = km;
    }
    Car.prototype.print = function () {
        return this.model + " has done " + this.km + " kilometers";
    };
    var mazda = new Car("Mazda 2", 2008, 70000);
    mazda.print();

    // singleton pattern
    var singletonPattern = (function () {
        var privateData = 0;
        function doSomething() {
            console.log(privateData);
        }
        return {
            public: doSomething
        };
    })();
    singletonPattern.public();

    // module pattern with object literals
    var basketModule = (function () {
        var basket = [];
        function method() {
            // logic
        }
        return {
            addItem: function (value) {
                basket.push(value);
            },
            getItemCount: function () {
                return basket.length;
            },
            doThing: method(),
            getTotal: function () {
                var q = this.getItemCount();
                var p;
                while (q--) {
                    p += basket[q].price;
                }
                return p;
            }
        };
    })();
    basketModule.addItem({
        item: 'name',
        price: 1
    });

    // revealing module pattern
    var revealingModule = (function () {
        var name = "";
        function setName(value) {
            name = value;
        }
        function getName() {
            return name;
        }
        return {
            set: setName,
            get: getName
        };
    })();

    // observer (publish/subscribe) pattern
    var pubsub = {};
    (function (q) {
        var topics = {},
            subUid = -1;

        // broadcast events with name and args
        q.publish = function (topic, args) {
            if (!topics[topic])
                return false;
            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;
            while (len--) {
                subscribers[len].func(topic, args);
            }
            return this;
        };

        // subscribe to event with name and callback func to be executed
        // when the even is observed
        q.subscribe = function (topic, func) {
            if (!topics[topic])
                topics[topic] = [];
            var token = (++subUid).toString();
            topics[topic].push({
                token: token,
                func: func
            });
            return token;
        };

        // unsubscribe based on a tokenized reference to the subscription
        q.unsubscribe = function (token) {
            for (var m in topics) {
                if (topics[m]) {
                    for (var i = 0, j = topics[m].length; i < j; i++) {
                        if (topics[m][i].token === token) {
                            topics[m].splice(i,1);
                            return token;
                        }
                    }
                }
            }
            return this;
        };
    })(pubsub);
    var observerHandler = function (topics, data) {
        console.log(topics + ": " + data);
    };
    var subscription = pubsub.subscribe("example", observerHandler);
    pubsub.publish("example", "Hello, World!");
    pubsub.unsubscribe(subscription);
})
(function (callbackPattern) {
    "use strict";
    function fakeAjax(url, cb) {
        var fake_responses = {
            "file1": "The first response",
            "file2": "The second response",
            "file3": "The third response"
        };
        var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 10;
        console.log("Requesting: " + url);

        setTimeout(function () {
            cb(fake_responses[url]);
        }, randomDelay);
    }
    function getFile(file) {
        fakeAjax(file, function (text) {
            handleResponse(file, text);
        });
    }

    var responses = {};
    function handleResponse(filename, contents) {
        if (!(filename in responses))
            responses[filename] = contents;
        var renderOrder = ["file1", "file2", "file3"];
        for (var i = 0; i < renderOrder.length; i++) {
            if (renderOrder[i] in responses) {
                if (typeof responses[renderOrder[i]] == "string") {
                    render(responses[renderOrder[i]]);
                    responses[renderOrder[i]] = false;
                }
            }
            else return;
        }
    }
    function render(contents) {
        console.log("Rendering: " + contents + ".");
    }

    getFile("file1");
    getFile("file2");
    getFile("file3");
})();
(function (promises) {
    "use strict";
    // time independent state, async flow control
    function fakeAjax(url, cb) {
        var fake_responses = {
            "file1": "The first response",
            "file2": "The second response",
            "file3": "The third response"
        };
        var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 10;
        console.log("Requesting: " + url);

        setTimeout(function () {
            cb(fake_responses[url]);
        }, randomDelay);
    }
    function getFile(file) {
        return new Promise(function (resolve) {
            fakeAjax(file, resolve);
        });
    }

    var p1 = getFile("file1");
    var p2 = getFile("file2");
    var p3 = getFile("file3");

    p1.then(function (data) {
        console.log(data);
    })
        .then(function () {
            return p2;
        })
        .then(function (data) {
            console.log(data);
        })
        .then(function () {
            return p3;
        })
        .then(function (data) {
            console.log(data);
        });
})();
(function (ES6) {
    "use strict";

    // modules
    var name = "S"; function getAge(){ return 35; }
    export default {name, getAge};
    import person from './modules'; person.name; person.getAge();

    export var name = "S"; export function getAge(){ return 35; }
    import {name, getAge} from './module';

    // function arguments
    function baz(arg, ...args) {}   // ...args will be available as a proper array
    function foo (x = 42) {}        // default value of argument
    function bar(x = foo()) {}      // default function argument

    // template literal
    let name = "S";
    console.log(`Hello ${name}`);   // equivalent to string concatenation "Hello " + name

    // spread operator
    var nums = [1,2]; var chars = ["a", "b"];
    console.log(...nums);        // the same as console.log(arr[0] + " " + arr[1]);

    function nameless() { return [1,2]; }
    var num = [0, ...nameless()];       // array concatenation
    var concat = [...nums, ...chars];

    // destructuring
    var person = { name: "S", age: 35 };
    display(person);
    function display({name, age}) {}    // the same as below
    function display(p) { let {name, age} = p; }    // the same as above,
        // any let or a hole pattern can be prefix with '?', will bind with undefined

    var num = [1,2,3,4,5];
    var [first,,,last] = num;       // '[1,5]'

    // arrow function, share the same lexical 'this' as surrounding code, document.addEventListener()
    var name = (x) => ++x;      // function name(x) { return ++x; }
    var name = (x) => { return ++x; };  // for multi line body use braces and explicit return

    // classes
    class Human {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        dataFormatter() {
            return this.name + this.age;
        }
        get data(){
            return this.dataFormatter();
        }
        set data(name){
            this.name = name;
        }
    }
    class Men extends Human {
        constructor(name, age, id){
            super(name, age);
            this.id = id;
        }
    }
    var person = new Men("S", 35, 123);

    // set collection of unique items
    var set = new Set();
    set.add(1); set.has(1); set.clear(); set.delete(1);   // add, check, clear all, delete one
    for (let n of set) {}     // for-of iterate over a set

    // weakmap collection, like a map, does not put strong reference on obj, prevent mem licks
    // map key-value collection, can use complex object as a key
    var user = { name: "S", id: 123 };
    var userSkills = new Map(); userSkills.set(user, ["JS", "React"]);

    // promise
    var promise = new Promise(function (resolve, reject) {
        // logic here, ajax call or DOM manipulation
        if (doSomething()) {
            resolve("Stuff worked");
        } else {
            reject("Stuff broken");
        }
    });
    promise.then(function (result) {
        console.log(result);    // "Stuff worked"
    }, function (err) {
        console.log(err);       // "Stuff broken"
    });

    // babel (transpile) + gulp (automate) + webpack (check dependencies and concatenate in static asset)
    dev_folder:> npm init
    dev_folder:> npm install --save-dev babel-cli
    dev_folder/.babelrc:>
            { "presets": [ "es2015" ] }
    dev_folder:> npm install --save-dev babel-preset-es2015 

    dev_folder:> npm install --save-dev webpack
    dev_folder:> npm install webpack-stream --save-dev

    dev_folder:> npm install --global gulp-cli
    dev_folder:> npm install --save-dev gulp
    dev_folder:> npm install --save-dev gulp-babel
    dev_folder/gulpfile.js:>
            const gulp = require('gulp');
            const babel = require('gulp-babel');
            const webpack = require('webpack-stream');
            gulp.task('default', ['babel']);
            gulp.task('babel', function () {
                return gulp.src('src/*.js')
                    .pipe(babel({
                        presets: ['es2015']
                    }))
                    .pipe(gulp.dest('assets/js/'))
            });
            gulp.task('webpack', ['babel'], function () {
                return gulp.src('assets/js/app.js')
                    .pipe(webpack({
                        output: {
                            path: "/assets/webpacked",
                            filename: "production.js"
                        }
                    }))
                    .pipe(gulp.dest('assets/webpacked'));
            });
            gulp.task('watch', function(){
                gulp.watch('src/*.js', ['babel', 'webpack']);
            });
    dev_folder:> gulp watch

    // vue templates
    dev_folder:> npm install -g vue-cli
    dev_folder:> npm install vue-router
})();
(function (utils) {
    "use strict";
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
})();
