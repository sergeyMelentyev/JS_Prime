function (singleElemSelector) {
    var elem = document.getElementById('id');
    var elem = document.querySelector('div p');
    var elem = document.querySelector("[data-role='p']");
}
function (collectionsSelector) {
    // html collection, methods .length and .item(index)
    var elem = document.getElementsByTagName('p');      // life collection
    var elem = document.getElementsByClassName('name');
    // node elements collection, methods .length and .item(index)
    var elem = document.querySelectorAll('div p');
    var elem = document.querySelectorAll('*[class="name"]');    // any elems with same class name
    var array = [].slice.call(elem);        // get array from NodeList object
}
function (getNodeElement) {
    var elem = document.getElementById('id');
    var childNodesName = [];
    if (elem.hasChildNodes()) {
        var children = elem.childNodes;      // .parentNode
        for (var i = 0; i < children.length; i++)
            childNodesName.push(children[i].nodeName);
    }
}
function (getSetAttr) {
    var atr = document.getElementById('one').getAttribute("data-role");
    atr.setAttribute("data-role", atr);
    var img = document.querySelector('img'); 
    img.setAttribute("src", "url");
}
function (fragment) {
    var fragment = document.createDocumentFragment();
    var p = document.createElement('p');
    var span = document.createElement('span'); span.innerText = 'text';
    p.appendChild(span);
    fragment.appendChild(p);
    document.body.appendChild(fragment);

    var oldNode = document.getElementById('id');
    var newNode = oldNode.cloneNode(true);
    oldNode.parentNode.replaceChild(newNode, oldNode);

    var elements = document.getElementsByTagName('p');      // add to the list of elems
    elements[0].parentNode.appendChild(p);

    var div = document.getElementById('id');
    var elems = div.getElementsByTagName('p');
    var newElem = document.createElement('span');
    div.insertBefore(newElem, elems[3]);

    var text = document.createTextNode("text");
    var p = document.createElement('p').appendChild(text);
}
function (deleteNode) {
    var one = document.getElementById('one');
    var set = one.getElementsByTagName('p');
    one.removeChild(set[0]);
}
function (addIdCalss) {
    elem.setAttribute('id', 'id-name');
    elem.setAttribute('class', 'class-name');
    elem.classList.add('class-name');       // .remove .toggle
}
function (contentManipulation) {
    elem.innerHTML = "";        // text in 'elem' plus all inner tags
    elem.textContent = "";      // only text in 'elem' plus text from all inner tags
}
function (addFunctionalityToArray) {
    var elem = document.querySelectorAll('div p');
    var array = [].slice.call(elem);
    array.forEach(namedFunc);        // pass each obj from array to namedFunc as an arg
    function namedFunc(item) {      // add event listener for each object
        item.addEventListener("click", function (event) {
            event.preventDefault();
            var atr = item.getAttribute("data-image-url");    // get any attribute
            item.setAttribute("src", atr);      // set any attribute
            item.textContent = "any text";      // set any content text
        });
    }
}
function (styles) {
    /*
        { box-sizing: border-box }        // padding and border will be included in the width

    */

    /* intrinsic ration based on content aspect ration
        .container { position: relative; padding-bottom: 56.25%; height: 0; }
        .content { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
    */

    /* small resolution styles first, then
        @media (min-width: 400px) {}
        @media (min-width: 600px) {}
    */
    
    elem.style.backgroundColor = 'red';
    elem.setAttribute('style', 'background-color: red; color: white;');
}
function (popupOverlay) {
    function displayPopup() {
        var overlay = document.createElement('div').setAttribute('id', 'overlay');
        document.body.appendChild(overlay);
        overlay.onclick = restore;
    }
    function restore() {
        document.body.removeChild(document.getElementById('overlay'));
    }
    global.onload = function () {
        displayPopup();
    };
}
function (events) {
    var div = document.getElementById('btn-wrapper');
    if (document.addEventListener) {    // W3C
        div.addEventListener('click', myHandler, false);
    } else if (document.attachEvent) {  // IE
        div.attachEvent('onclick', myHandler);
    } else {        // last resort
        div.onclick = myHandler;
    }

    function myHandler(e) {
        var src, parts;
        e = e || window.event;      // get event
        src = e.target || e.srcElement; // get source element

        /*
            <div id="btn-wrapper"> one element for all buttons
            if (src.nodeName.toLowerCase() !== "button")
                return;
        */

        parts = src.innerHTML.split(': ');      // actual logic
        parts[1] = parseInt(parts[1], 10) + 1;
        src.innerHTML = parts[0] + ': ' + parts[1];

        if (typeof e.stopPropagation === "function")    // prevent bubbling
            e.stopPropagation();
        if (typeof e.cancelBubble !== "undefined")
            e.cancelBubble = true;

        if (typeof e.preventDefault === "function")     // prevent default action
            e.preventDefault();
        if (typeof e.returnValue !== "undefined")
            e.returnValue = false;
    }
}
function (persistence) {
    // cookie
    document.cookie = "nameOfCookie=value";     // "name=value" format to define cookie obj
    name = "Raymond Camden"; document.cookie = "name=" + encodeURIComponent(name);
    document.cookie = "name=Raymond; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=app.foo.com";
    document.cookie = "name=Raymond; expires=Thu, 01 Jan 1970 00:00:00 GMT";        // delete cookie

    // Web Storage API sessionStorage and localStorage, key-val pairs, val in string format
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

    // IndexedDB API, NOSQL storage, key-value pairs, value can be complex structured obj
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
function (backgroundThread) {
    var ww = new Worker('ww.js');
    ww.onmessage = function (event) {
        // subscribe to the event and receive updates via 'event.data'
    };
    // ww.js file
    postMessage("post event before start");
    postMessage("post event before end");
}   
function (request) {
    // XMLHttpRequest + $.ajax
    jQuery.ajax();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {      // provide a callback to the event
        if ((xhr.readyState === 4) && (xhr.status === 200)) {
            document.body.innerHTML += '<div>' + xhr.responseText + '</div>';
        }

    };
    xhr.open("GET", "page.html", true);     // method, url, asynchronous
    xhr.send("");

    // webSocket
    // browser send GET request, if server response success, TCP connection stay open
    // each side can send data without headers and metadata
    var ws = new WebSocket("ws://site.com/demo");
    ws.onopen = function() { /* success callback, connection established */ };
    ws.onclose = function() { /* closing callback, connection ended */ };
    ws.onmessage = function(data) { /* receiving data callback */ };
}
function (jQuery) {
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
function (testing) {
    "use strict";
    // QUnit модульные тесты для каждой функции
}
