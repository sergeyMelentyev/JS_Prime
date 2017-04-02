/* DATA TYPES */
(function () {
    "use strict";
    typeof null;            // "object"
    typeof foo;             // "undefined"
    typeof "foo";           // "string"
    typeof 123;             // "number"
    typeof true;            // "boolean"
    typeof {a:1};           // "object"
    typeof function () {};  // "function"
})();

/* COERCION */
(function () {
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

/* SCOPE */
(function () {
    "use strict";
    window.a = 0;   // global vars are props of the global scope
    var varA;       // will stick only to function scope
    let varB;       // will stick to any block scope
    const varC = 0;     // constant value will stick to any block scope

    function funcOne(bigData){}     // engine will remove block-scoping after executing
    {
        let bigData = {};
        funcOne(bigData);
    }
})();

/* FUNCTION & CLOSURE */
(function () {
    "use strict";
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
})();

/* THIS POINTER */
(function () {
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
})();

/* OBJECT */
(function () {
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

    var bool = ("prop" in obj);     // check if property is exist also included prototype link
    obj.hasOwnProperty("prop");      // check if property is exist only in that object
    delete obj.key;         // delete value by key from obj

    // iterate over object
    for (var key in obj) {
        // "key" will show all keys, "objOne[key]" all values
    }
    Object.keys(obj);        // get array of keys

})();

/* ARRAY */
(function () {
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

    function predicateForEach(item, index, array) {
        // logic here
    }   // call predicate func on each value
    [1,2,3,4].forEach(predicateForEach);

// iteration over array
    for (var i in array) {}     // will iterate over array index, not values
    for (var j of array) {}     // will iterate over array values

    var iterator = array[Symbol.iterator]();    // { value: 1, done: false }
    iterator.next();
})();

/* PROTOTYPE */
(function () {
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
})();

/* BEHAVIOR DELEGATION */
(function () {
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

/* DESIGN PATTERNS */
(function () {
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
    var singletonPattern = (function Singleton () {
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

/* UTILS */
(function () {
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

/* CONCURRENCY */
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
})(window);
(function (thunkPattern) {
    "use strict";

})(window);

/* ES6 */
(function () {
    "use strict";
    var name = (x) => ++x;      // arrow function
    function foo (x = 42) {}        // default value of argument
    function bar(x = foo()) {}      // default function argument

})();
