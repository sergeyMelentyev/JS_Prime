function designPatterns() {
    {   // function constructor pattern
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
            function privateMethod() {
                console.log(privateData);
            }
            return {
                public: privateMethod,
                api: function() {
                    privateMethod();
                }
            };
        })();
        singletonPattern.public(); singletonPattern.api();
    }
    {   // module pattern with object literals
        var basketModule = (function () {
            var basket = [];
            function privateMethod() { }
            return {
                addItem: function (value) {
                    basket.push(value);
                },
                getItemCount: function () {
                    return basket.length;
                },
                doThing: privateMethod(),
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
    }
    {   // revealing module pattern
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
    }
    {   // observer (publish/subscribe) pattern
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
}
function sort() {
    // argumets must be provided, if not behavior will be different
    arr.sort(a,b) {
        return a > b ? 1 : -1;      // negative if "a" should be before "b", positive if "b" should be before "a"
        return 0;                   // two elements are equal
    }
}
function persistence() {
    {   // cookie
        document.cookie = "nameOfCookie=value";     // "name=value" format to define cookie obj
        name = "Raymond Camden"; document.cookie = "name=" + encodeURIComponent(name);
        document.cookie = "name=Raymond; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=app.foo.com";
        document.cookie = "name=Raymond; expires=Thu, 01 Jan 1970 00:00:00 GMT";        // delete cookie
    }
    {   // Web Storage API sessionStorage and localStorage, key-val pairs, val in string format
        // complex data types via JSON.stringify() method
        localStorage.setItem(); localStorage.getItem(); localStorage.removeItem(); localStorage.clear();

        if (window.sessionStorage && window.localStorage) { /* check if API is supported */ }

        var item = { id: "5456098", name: "Samsung S8", dateView: new Date() };
        localStorage.setItem(item.id, JSON.stringify(item));
        var key, value;
        for (var i = 0; i < localStorage.length; i++) {
            key = localStorage.key(i); value = JSON.parse(localStorage.getItem(key));
            if (Date.parse(value.dateView) < (new Date() - 1000*60*60*24*30))
                localStorage.removeItem(key);
        }
        // events, only when another instance of the browser modifies storage
        $(window).on("storage", function(e) {
            console.log("storage event fired");
            $("#test").val(e.originalEvent.newValue);       // also ".oldValue" 
        });
    }
    {   // IndexedDB API, NOSQL storage, key-value pairs, value can be complex structured obj
        // work with request, pass callback func for answer via DOM notification
        window.indexedDB = window.indexedDB || window.mozIndexedDB  // check if API is supported
            || window.webkitIndexedDB || window.msIndexedDB;
        if("indexedDB" in window) { /* the same as above */ }

        var db;
        var openRequest = window.indexedDB.open("name", 1);     // open "name" db, ver 1.0

        openRequest.onupgradeneeded = function(e) {
            var thisDB = e.target.result;
            if(!thisDB.objectStoreNames.contains("people")) {
                var peopleOS = thisDB.createObjectStore("people", { keyPath: "email" });
                // peopleOS.createIndex("name of index", "path", options);
                peopleOS.createIndex("gender", "gender", {unique: false});
                peopleOS.createIndex("ssn", "ssn", {unique: true});
            }
             if(!thisDB.objectStoreNames.contains("notes")) {
                var notesOS = thisDB.createObjectStore("notes", { autoIncrement: true });
                notesOS.createIndex("title", "title", {unique:false});
            }
            if(!thisDB.objectStoreNames.contains("logs")) {
                thisDB.createObjectStore("logs", { keyPath: "id", autoIncrement: true });
            }
        }
        openRequest.onsuccess = function(e) { db = e.target.result; };
        openRequest.onerror = function(e) { console.dir(e); };

        // example
        var db;
        $(document).ready(function() {
            if(!"indexedDB" in window) return;
            var openRequest = indexedDB.open("ora_idb5", 1);
            openRequest.onupgradeneeded = function(e) {
                var thisDB = e.target.result;
                if(!thisDB.objectStoreNames.contains("people"))
                    var peopleOS = thisDB.createObjectStore("people", {keyPath: "email"});
            }
            openRequest.onsuccess = function(e) {
                db = e.target.result;
                $("#addPerson").on("click", addPerson);
            }
        });
        function addPerson(e) {
            var name = $("#name").val();        // input field
            var email = $("#email").val();
            var transaction = db.transaction(["people"], "readwrite");  // get a transaction
            var store = transaction.objectStore("people");      // ask for the objectStore
            var person = { name: name, email: email, created: new Date().getTime() };
            var request = store.add(person);
            request.onerror = function(e) { console.log("Error", e.target.error.name); };
            request.onsuccess = function(e) { console.log("Woot! Did it"); };
        }
        function getPerson(e) {
            var key = $("#getemail").val();
            if(key === "") return;
            var transaction = db.transaction(["people"],"readonly");
            var store = transaction.objectStore("people");
            var request = store.get(key);
            request.onsuccess = function(e) { var result = e.target.result; };
            request.onerror = function(e) { console.dir(e); };
        }
        function updatePerson(e) {
            var name = $("#name").val();
            var email = $("#email").val();
            var created = $("#created").val();
            var transaction = db.transaction(["people"],"readwrite");   // get a transaction
            var store = transaction.objectStore("people");      // ask for the objectStore
            var person = { name: name, email: email, created: created };
            var request = store.put(person);
            request.onerror = function(e) { console.log("Error",e.target.error.name); };
            request.onsuccess = function(e) { console.log("Woot! Did it"); }
        }
        function getPeople(e) {
            var s = "";
            var transaction = db.transaction(["people"], "readonly");
            var people = transaction.objectStore("people");
            var cursor = people.openCursor();
            cursor.onsuccess = function(e) {
                var cursor = e.target.result;
                if(cursor) {
                    s += "<h2>Key "+cursor.key+"</h2><p>";
                    for(var field in cursor.value) {
                        s+= field+"="+cursor.value[field]+"<br/>";
                    }
                    s+="</p>";
                    cursor.continue();
                }
            }
            transaction.oncomplete = function() {
                $("#results").html(s);
            }
        }
        function searchPeople(e) {
            var lower = $("#lower").val();
            var upper = $("#upper").val();
            if (lower == "" && upper == "") return;
            var range;
            if (lower != "" && upper != "")
                range = IDBKeyRange.bound(lower, upper);
            else if (lower == "")
                range = IDBKeyRange.upperBound(upper);
            else
                range = IDBKeyRange.lowerBound(lower);
            var transaction = db.transaction(["people"],"readonly");
            var store = transaction.objectStore("people");
            var index = store.index("name");
            var s = "";
            index.openCursor(range).onsuccess = function(e) {
                var cursor = e.target.result;
                if(cursor) {
                    s += "<h2>Key "+cursor.key+"</h2><p>";
                    for(var field in cursor.value) {
                        s+= field+"="+cursor.value[field]+"<br/>";
                    }
                    s+="</p>";
                    cursor.continue();
                }
            }
            transaction.oncomplete = function() {
                if(s === "") s = "<p>No results.</p>";
                $("#results").html(s);
            }
        }
        function deletePerson(e) {
            var key = $("#email").val();
            if(key === "") return;
            var transaction = db.transaction(["people"],"readwrite");
            var store = transaction.objectStore("people");
            var request = store.delete(key);
            request.onsuccess = function(e) { console.log("Person deleted"); };
            request.onerror = function(e) { console.log("Error"); };
        }
    }
}
function backgroundThread() {
    var ww = new Worker('ww.js');
    ww.onmessage = function (event) {
        // subscribe to the event and receive updates via 'event.data'
    };
    // ww.js file
    postMessage("post event before start");
    postMessage("post event before end");
}   
function request() {
    {   // XMLHttpRequest
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {      // provide a callback to the event
            if ((xhr.readyState === 4) && (xhr.status === 200)) {
                document.body.innerHTML += '<div>' + xhr.responseText + '</div>';
            }

        };
        xhr.open("GET", "page.html", true);     // method, url, asynchronous
        xhr.send("");
    }
    {   // jQuery.ajax
        $.ajax({
            url: "url",
            context: document.body
        }).done(function() {
            // logic here
        });
    }
    {   // fetch webapi
        fetch("url", {
            method: "GET"
        }).then(response => response.json()).then(data => console.log(data));
    }
    {   // webSocket
        // browser send GET request, if server response success, TCP connection stay open
        // each side can send data without headers and metadata
        var ws = new WebSocket("ws://site.com/demo");
        ws.onopen = function() { /* success callback, connection established */ };
        ws.onclose = function() { /* closing callback, connection ended */ };
        ws.onmessage = function(data) { /* receiving data callback */ };
    }
}
function jQuery() {
    var $ = global.jQuery;
    $('elem').keypress(function (event) {
        // receive event each time key pressed
    });
    var windowHeight = $(window).height();
    $('selector').on('click', function () {
        $('body').scrollTop(windowHeight);
    });
    $(window).scroll(function () {
        var div = $('div').height();
        if ($(window).scrollTop() > (div / 4))
            $('selector').animate({top: div + 100}, 1000);
    });
}
function testing() {
    // QUnit module testing
    // JSCheck case testing
}
function babelGulpWebpack() {
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
}
