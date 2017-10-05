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
function animeLoop() {
    var box = document.getElementById("box"),
        fpsDisplay = document.getElementById("fpsDisplay"),
        boxPos = 10,
        boxVelocity = 0.08,
        limit = 300,
        lastFrameTimeMs = 0,
        maxFPS = 60,
        delta = 0,
        timestep = 1000 / 60,
        fps = 60,
        framesThisSecond = 0,
        lastFpsUpdate = 0

    function update(stemp) {
        boxPos += boxVelocity * stemp
        if (boxPos >= limit || boxPos <= 0) boxVelocity = -boxVelocity
    }
    function draw() {
        box.style.left = boxPos + "px"
        fpsDisplay.textContent = Math.round(fps) + " FPS"
    }
    function panic() {
        delta = 0
    }

    function mainLoop(timestamp) {
        if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
            requestAnimationFrame(mainLoop)
            return
        }
        delta += timestamp - lastFrameTimeMs
        lastFrameTimeMs = timestamp

        if (timestamp > lastFpsUpdate + 1000) {
            fps = 0.25 * framesThisSecond + 0.75 * fps
            lastFpsUpdate = timestamp
            framesThisSecond = 0
        }
        framesThisSecond++

        var numUpdateSteps = 0
        while (delta >= timestep) {
            update(timestep)
            delta -= timestep
            if (++numUpdateSteps >= 240) {
                panic()
                break
            }
        }
        draw()
        requestAnimationFrame(mainLoop)
    }

    requestAnimationFrame(mainLoop)
    }
function patterns() {
    {   // from object to array of objects
        const schools = { "Yorktown": 10, "Washington & Lee": 2, "Wakefield": 5 }
        const schools = Object.keys(schools).map(key => ({ name: key, wins: schools[key] }) )
    }
    {   // from array of objects to object, reduce array to a single value  
        const colors = [ { id: "1", title: "red", rating: 2 }, { id: "2", title: "blue", rating: 1 } ]
        const r = colors.reduce( (hash, {id, title, rating}) => { hash[id] = {title, rating}; return hash }, {} )
    }
    {   // from array of same value to an array of distinct values
        const colors = ["red", "red", "green", "blue", "green"]
        const distinctColors = colors.reduce( (distinct, color) => (distinct.indexOf(color) !== -1) ? distinct : [...distinct, color], [] )
    }
    {   // functional inheritance
        function nameOne(id) {
            return {
                toString: function() { return "nameOne " + id }
            }
        }
        function nameTwo(id) {
            let that = nameOne(id)
            that.test = function(testId) {
                return testId === id
            }
            return that
        }
    }
    {   // classesFreeOriented
        function constructor(spec) {
            let 
                {member} = spec,
                {other} = other_constructor(spec),
                method = function() {
                    // member, other, method, spec
                }
            return Object.freeze({
                method,
                other
            })
        }
    }
    {   // behavior delegation
        var Foo = {
            init: function(who) { this.me = who },
            identify: function() { return ("I am " + this.me) }
        }
        var bar = Object.create(Foo)
        bar.speak = function () { console.log("Hello, " + this.identify() + ".") }
        var bam = Object.create(bar)

        // widget examaple
        var Widget = {
            init: function(width,height) {
                this.width = width || 50
                this.height = height || 50
                this.$elem = null
            },
            insert: function($where) {
                if (this.$elem)
                    this.$elem.css({width: this.width+"px", height: this.height+"px"}).appendTo($where)
            }
        }
        var Button = Object.create(Widget)
        Button.setup = function(width, height, label) {
            this.init(width, height)
            this.label = label || "Default"
            this.$elem = $("<button>").text(this.label)
        }
        Button.build = function($where) {
            this.insert($where)
            this.$elem.click(this.onClick.bind(this))
        }
        Button.onClick = function(evt) { console.log(this.label + "' clicked!") }
        $(document).ready(function() {
            var $body = $(document.body)
            var btn1 = Object.create(Button)
            btn1.setup(125, 30, "Hello")
            var btn2 = Object.create(Button)
            btn2.setup(150, 40, "World")
            btn1.build($body)
            btn2.build($body)
        })

        // auth example
        var LoginController = {
            errors: [],
            getUser: function() { return document.getElementById( "login_username" ).value },
            getPassword: function() { return document.getElementById( "login_password" ).value },
            validateEntry: function(user,pw) {
                user = user || this.getUser()
                pw = pw || this.getPassword()
                if (!(user && pw)) return this.failure( "Please enter a username & password!" )
                else if (pw.length < 5) return this.failure( "Password must be 5+ characters!" )
                return true
            },
            showDialog: function(title,msg) { /* display success message to user in dialog */ },
            failure: function(err) { this.errors.push( err ) this.showDialog( "Login invalid: " + err ) }
        }

        var AuthController = Object.create( LoginController )
        AuthController.errors = []
        AuthController.checkAuth = function() {
            var user = this.getUser()
            var pw = this.getPassword()
            if (this.validateEntry(user, pw)) {
                this.server("/check-auth", {
                    user: user,
                    pw: pw
                }).then(this.accepted.bind(this)).fail(this.rejected.bind(this))
            }
        }
        AuthController.server = function(url, data) {return $.ajax({url: url, data: data})}
        AuthController.accepted = function() {this.showDialog("Success", "Authenticated!")}
        AuthController.rejected = function(err) {this.failure("Auth Failed: " + err)}
    }
    {   // get required key-value from object
        // pass object and get new obj with only required key-value pares
        function pick(obj, ...keys) {
            let result = Object.create(null)
            for (let i = 0, len = keys.length i < len i++)
                result[keys[i]] = obj[keys[i]]
            return result
        }
    }
    {   // copy object and add new prototype
        function replace_proto(object, prototype) {
            var result = Object.create(prototype)
            object.getOwnProperyNames(object).forEach(function (key) {
                Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(object, key))
            })
            return result
        }
    }
    {   // functional patterns
        // composition pattern
        const compose = (a, b) => (c) => a(b(c))
        const cookAndEat = compose(eat, cook)

        // partial application pattern
        const mapWith = (fn) => (array) => map(array, fn)  // apply func to each elem of an arr
        const squareAll = mapWith((n) => n * n)
        squareAll([1, 2, 3])            // [1, 4, 9]

        // "combinator" higher-order pure func that take only func as args and return a func
        const addOne = (number) => number + 1
        const doubleOf = (number) => number * 2
        const doubleOfAddOne = (number) => doubleOf(addOne(number))    // function compose combinator

        const not = (fn) => (x) => !fn(x)
        const something = (x) => x != null
        const nothing = not(something)                                 // function decorator

        // currying
        const userLogs = userName => message => 
            console.log(`${userName} -> ${message}`)
        const log = userLogs("grandpa23")
        getFakeMembers(20).then(        // grandpa23 -> successfully loaded 20 members
            members => log(`successfully loaded ${members.length} members`)
        )
    }
    {   // simple module pattern, private fields
        var foo = (function() {
            var publicAPI = {
                bar: function() {
                    publicAPI.baz()
                },
                baz: function() {
                    console.log("logic")
                }
            }
            return publicAPI
        })()

        // ES5 implementation
        var Person = (function() {
            var privateData = {},
                privateId = 0
            function Person(name) {
                Object.defineProperty(this, "_id", {
                    value: privateId++
                })
                privateData[this._id] = {
                    name: name
                }
            }
            Person.prototype.getName = function() {
                return privateData[this._id].name
            }
            return Person
        }())
        // ES6 implementation
        let Person = (function() {
            let privateData = new WeakMap()
            function Person(name) {
                privateData.set(this, {
                    name: name
                })
            }
            Person.prototype.getName = function() {
                return privateData.get(this).name
            }
            return Person
        }())
        // private field and exploit
        function vector() {
            let array = []
            return {
                get: function get(i) {
                    return array[i]        // cure "return array[+i]"
                },
                store: function store(i,v) {
                    array[i] = v           // cure "array[+i] = v"
                },
                append: function append(v) {
                    array.push(v)          // cure "array[array.length] = v"
                }
            }
        }
        let exploit
        const myVector = vector()
        myVector.store("push", function () {
            exploit = this
        })
        myVector.append()      // now "exploit" === "array" and can be manipulated
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
function webWorker() {
    {   // check for support
        isWorkersAvailable() {
            return !!window.Worker;
        }
    }
    {   // main.js with UI thread
        var longThread = new Worker("long.js");                 // instantiate another thread
        longThread.onmessage = function (event) {
            const answer = event.data;
            /* logic here */
        };
        // the same as above
        longThread.addEventListener("message", function(event) {
            const answer = event.data;
            /* logic here */
        }, false);
        longThread.postMessage({ question: "value" });          // send request with data
    }
    {   // longThread.js with parallel thread
        importScripts('script1.js', 'script2.js');          // import external files

        function name(question) {
            /* logic here */
            return answer;
        }
        self.onmessage(function (event) {                       // receive request and data
            const question = event.data.question;
            const answer = name(question);                      // logic
            self.postMessage(answer);                           // send answer
        });
    }
    {   // fetch every 30 sec tweets from Twitter and save to local storage
        // main app.js
        const worker = new Worker("long.js");
        worker.addEventListener("message", function(e) {
            var curTime = new Date();
            $('#result').append( curTime + " ) " + e.data + "<br/>");
            var source = e.data[0].source;
            if (typeof source !== "undefined" ) {
                var tweets = document.createElement("ul");
                for (var i=0; i < 10; i++) {
                    if (typeof e.data[i] !== "undefined" && e.data[i].text !== "undefined") {
                        var tweetTextItem = document.createElement("li");
                        var tweetText = document.createTextNode(e.data[i].text + " | " +
                                        e.data[i].source  + " (" +
                                        e.data[i].created_at + ")" ) ;
                        tweetTextItem.appendChild(tweetText);
                        tweets.appendChild(tweetTextItem);
                        saveTweet(e.data[i]);
                    }
                }
                $("#tweets").append(tweets);
            }
        }, false);
        worker.onerror = function(e){
            throw new Error(e.message + " (" + e.filename + ":" + e.lineno + ")");
        };
        function saveTweet(tweet) {
            localStorage.setItem(tweet.id_str, "{" + "'created': '" + tweet.created_at + "'," +
            "'tweet-text': '" + tweet.text + "'}");
        }
        function getTweet(tweetID) {
            return localStorage.getItem(tweetID);
        }

        // worker long.js
        var updateDelay = 30000;
        var user = "greenido";
        function getURL(user) {
            return 'http://twitter.com/statuses/user_timeline/' + user
            + '.json?count=' + 12 + '&callback=processTweets';
        }
        function readTweets() {
            try {
                var url = getURL(user);
                postMessage("Worker Status: Attempting To Read Tweets for user - " + user +
                " from: "+ url);
                importScripts(url);
            } catch (e) {
                postMessage("Worker Status: Error - " + e.message);
                setTimeout(readTweets, updateDelay);
            }
        }
        function processTweets(data) {
            var numTweets = data.length;
            if (numTweets > 0) {
                postMessage("Worker Status: New Tweets - " +  numTweets);
                postMessage(data);
            } else {
                postMessage("Worker Status: New Tweets - 0");
            }
            setTimeout(readTweets, updateDelay);
        }
        readTweets();   // start worker
    }
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
function testing() {
    // QUnit module testing
    // JSCheck case testing
    }
function utils() {
    {   // compare floating point numbers
        if (!Number.EPSILON) Number.EPSILON = Math.pow(2, -52);
        function closeToEqual(n1, n2) {
            return Math.abs(n1 - n2) < Number.EPSILON;
        }
    }
    {   // wait until something is done
        function doSomething() {
            if (!APP.ready) {
                return void setTimeout(doSomething, 100);   // try again later
            }
            var result;     // do some stuff
            return result;
        }
        if (doSomething()) {
            // handle next task
        }
    }
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
