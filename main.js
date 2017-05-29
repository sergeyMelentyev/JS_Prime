(function (dataType) {
    typeof null;            // "object"
    typeof foo;             // "undefined"
    typeof "foo";           // "string"
    typeof 123;             // "number"
    typeof true;            // "boolean"
    typeof {a:1};           // "object"
    typeof function () {};  // "function"
    typeof symbol;          // "symbol"
})();
(function (coercion) {
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
    var a;      // hoisted, new binding is created in global scope and NEW prop is added to the global obj
    let b;      // new binding is created in global scope but NO prop is added to the global obj
    const c = 0;    // constant value will stick to any block scope, like 'let'

    function funcOne(bigData){}     // engine will remove block-scoping after executing
    {
        let bigData = {};
        funcOne(bigData);
    }
})();
(function (function) {
    function name() {}         // function declaration, will be hoisted
    var funcName = function () {};      // function expression, will not be hoisted

    // arguments
    var argsSize = funcName.length;     // number of arguments
    function baz(arg) { arg === arguments[0]; }     // arguments object, contains all params

    // rest param, contains all params passed after 'obj', must be only one rest param and it must be last
    function pick(obj, ...keys) {
        let result = Object.create(null);
        for (let i = 0, len = keys.length; i < len; i++)
            result[keys[i]] = obj[keys[i]];
        return result;
    }
    let book = { title: "", author: "", year: 2015 };
    let bookData = pick(book, "author", "year");
    
    // default arguments ES5
    function makeRequest(url, timeout, callback) {
        timeout = (typeof timeout !== "undefined") ? timeout : 2000;
        callback = (typeof callback !== "undefined") ? callback : function() {};
    }
    // default arguments ES6
    function makeRequest(url, timeout = 2000, callback = funcName() {}) {
        // logic here
    }

    // function constructor
    var add = new Function("first", "second = first", "return first + second");
    add(1, 1); add(1);      // 2
    var pickFirst = new Function("...args", "return args[0]");
    pickFirst(1, 2);        // 1

    // spread operator
    var nums = [1,2]; var chars = ["a", "b"];
    console.log(...nums);       // the same as console.log(arr[0] + " " + arr[1]);
    function nameless() { return [1,2]; }
    var num = [0, ...nameless()];       // array concatenation
    var concat = [...nums, ...chars];

    // closure, func is able to access its lexical scope even when executing outside it
    function outerOne() {
        function innerOne() { /* logic here */ }
        return innerOne;    // return reference of the innerOne() func object
    }
    var closure = outerOne(); closure();

    // functions internal-only methods
    function Person(name) { this.name = name; }
    var x = Person("Sergey");       // [[Call]] method executes the body of func as it is
    var y = new Person("Sergey");   // [[Construct]] methods executes, new object is created,
        // then executing the func body with 'this' set to the new target

    // arrow func, have no 'this' binding, the value of 'this' can be determined by looking up the scope chain
    // call(), apply(), bind() will not affect 'this' binding
    var name = (x) => ++x;      // function name(x) { return ++x; }
    var name = (x) => { return ++x; };  // for multi line body use braces and explicit return
    
    function createArrowFunctionReturningFirstArg() { return () => arguments[0]; }
    var arrowFunction = createArrowFunctionReturningFirstArg(5);
    arrowFunction();    // arrow func don’t have args obj, args remain accessible due to scope chain resolution of args identifier

    // recursive function with tail call optimization, current stack frame is cleared and reused
        // no access to vars in the current stack frame (func is not a closure)
        // func making the tail call has no further work to do after the tail call returns
        // result of the tail call is returned as the funct value
    function factorial(n, p = 1) {
        if (n <= 1) {
            return 1 * p;
        } else {
            let result = n * p;
            return factorial(n - 1, result);
        }
    }
})();
(function (thisPointer) {
    // if func called with "new" binding, 'this' = newly constructed obj
    // if func called with "call" or "apply" explicit binding, 'this' = explicitly specified obj
    // if func called with a context implicit binding, 'this' = context object
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
    var baz = function() {
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
(function (string) {
    var msg = "";
    msg.indexOf("a");           // .lastIndexOf("a"); find the actual position, return index
    msg.startsWith("a");        // .endsWith("a"); .includes("a"); search the whole 'msg', return boolean
    msg.startsWith("a", 4);     // .endsWith("a", 4); .includes("a", 4); check part of the 'msg', return boolean
    msg.repeat(2);

    // template literal
    let message = `Multiline
        string`;                // indentation is counting in 'message.length'
    let count = 10,             // template literal substitution === string concatenation
        price = 0.25,
        message = `${count} items cost ${(count * price).toFixed(2)}.`;
})();
(function (symbol) {
    let firstName = Symbol("first name");
    let person = {
        [firstName]: "Sergey"       // computed object literal property
    };

    // global symbol registry, method search global symbol registry for key "uid"
    // if finds, returns the existing. If not, new symbol is created and registered
    let uid = Symbol.for("uid");
    let object = {}; object[uid] = "12345";

    // get symbols
    let symbols = Object.getOwnPropertySymbols(person); // array for-of symbols
    Symbol.keyFor(uid)
})();
(function (array) {
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

    // destructuring
    let colors = [ "red", "green", "blue" ];
    let [ firstColor, secondColor ] = colors;       // "red", "green"
    let [ , firstColor, secondColor ] = colors;     // "green", "blue"
})();
(function (object) {
    // create a new object
    var obj = {};
    var obj = Object.create(null);  // obj with a null prototype, ensuring that there are no inherited props
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

    // computed prop name
    var suffix  = " name";
    var person = {
        ["first" + suffix]: "Sergey"
    };

    // compare objects
    Object.is(NaN, NaN);        // true, vals are equivalent if they are of the same type and have the same val
    var bool = ("key" in obj);      // check if property is exist also included prototype link
    obj.hasOwnProperty("key");      // check if property is exist only in that object
    delete obj.key;         // delete 'value' by targeting its 'key' from obj

    // mixing objs props and methods, shallow copy, receiver - supplier - supplier - ...
    function EventTarget() { }
    EventTarget.prototype = {
        constructor: EventTarget,
        emit: function() { },
        on: function() { }
    };
    var myObject = {}; Object.assign(myObject, EventTarget.prototype, thirdObjIfNeeded);
    myObject.emit();

    // property enumeration, numeric keys in ascending, string keys in the order in which they were added
    var obj = { b: 1, a: 1, 1: 1, 0: 1 };
    Object.getOwnPropertyNames(obj).join("");   // 01ba

    // iterate over object, unspecified enumeration order
    for (var key in obj) {
        // "key" will show all keys, "objOne[key]" all values
    }
    Object.keys(obj);        // get array of keys, unspecified enumeration order

    // destructuring
    var person = { name: "S", age: 35 };
    let {name, age} = person;       // let name = "S"; let age = 35;
    function display({name, age}) {}
})();
(function (objPrivateFields) {
    // ES5 implementation
    var Person = (function() {
        var privateData = {},
            privateId = 0;
        function Person(name) {
            Object.defineProperty(this, "_id", {
                value: privateId++
            });
            privateData[this._id] = {
                name: name
            };
        }
        Person.prototype.getName = function() {
            return privateData[this._id].name;
        };
        return Person;
    }());
    // ES6 implementation
    let Person = (function() {
        let privateData = new WeakMap();
        function Person(name) {
            privateData.set(this, {
                name: name
            });
        }
        Person.prototype.getName = function() {
            return privateData.get(this).name;
        };
        return Person;
    }());
})();
(function (setAndMap) {
    // set is an ordered collection of unique items, cannot be directly accessed by index
    var set = new Set(); set.size();     // accept any iterable obj
    set.add(1); set.has(1); set.clear(); set.delete(1);   // add, check, clear all, delete one

    let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);    // from array to set
    let array = [...set];       // from set to array with spread operator
    function eliminateDuplicates(items) { return [...new Set(items)]; }

    // iterate over set
    for (let n of set) {}     // for-of iterate over a set

    let set = new Set([1, 2]);
    let processor = {
        output(value, key, owner) {
            console.log(value + " " + key + " " + owner);
        },
        process(dataSet) {      // the same as below
            dataSet.forEach(function(value, key, owner) {
                this.output(value, key, owner);
            }, this);
        },
        process(dataSet) {      // the same as above
            dataSet.forEach((value, key, owner) => {
                this.output(value, key, owner);
            });
        }
    };
    processor.process(set);

    // weak set, only store weak obj ref and CANNOT store primitive vals
    // weak ref does`t prevent garbage collection
    let set = new WeakSet();    // not iterable, cannot be used in for-of loop and forEach()

    // map is ordered list of key-value pairs, both can have any type
    var userSkills = new Map();
    userSkills.set(key, ["vals"]);      // .get(), .has(), .delete(), .clear(), size()

    let map = new Map([["name", "Sergey"], ["age", 35]]);   // map initialization
    let processor = {
        output(value, key, owner) {
            console.log(value + " " + key + " " + owner);
        },
        process(dataSet) {      // the same as below
            dataSet.forEach(function(value, key, owner) {
                this.output(value, key, owner);
            }, this);
        },
        process(dataSet) {      // the same as above
            dataSet.forEach((value, key, owner) => {
                this.output(value, key, owner);
            });
        }
    };
    processor.process(map);

    // weakmap does`t put strong reference on obj, does`t prevent garbage collection
    // every key must be an obj
    let map = new WeakMap();
    let key1 = {},
        key2 = {},
    map = new WeakMap([[key1, "Hello"], [key2, 42]]);
})();
(function (prototype) {
    // super reference
    let person = {
        getGreeting() { return "Hello"; }
    };
    let friend = {
        getGreeting() { return super.getGreeting() + ", hi!"; }
    };
    Object.setPrototypeOf(friend, person);      // prototype is person
    let relative = Object.create(friend);       // prototype is friend
    person.getGreeting(); friend.getGreeting(); relative.getGreeting();

    function Human(arg) {
        // func will create arbitrary labeled "object"
        // "Human.prototype" will point to that "object"
        // "object.constructor" will point back to "Human"
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
(function (promise) {
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
})();
(function (classes) {
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
})();
(function (module) {
    var name = "S"; function getAge(){ return 35; }
    export default {name, getAge};
    import person from './modules'; person.name; person.getAge();

    export var name = "S"; export function getAge(){ return 35; }
    import {name, getAge} from './module';
})();
(function (designePatterns) {
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
})();
(function (callbackPattern) {
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
(function (utils) {
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
