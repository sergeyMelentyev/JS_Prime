function designPatterns() {
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
}
function callbackPattern() {
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
}
function utils() {
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
}
function sort() {
    // argumets must be provided, if not behavior will be different
    arr.sort(a,b) {
        return a > b ? 1 : -1;      // negative if "a" should be before "b", positive if "b" should be before "a"
        return 0;                   // two elements are equal
    }
}
