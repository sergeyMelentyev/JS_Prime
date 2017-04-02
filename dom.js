/* SINGLE ELEM SELECTOR */
(function () {
    "use strict";
    var elem = document.getElementById('id');
    var elem = document.querySelector('div p');
    var elem = document.querySelector("[data-role='p']");
})();

/* COLLECTIONS SELECTOR */
(function () {
    "use strict";
    // html collection, methods .length and .item(index)
    var elem = document.getElementsByTagName('p');      // life collection
    // node elements collection, methods .length and .item(index)
    var elem = document.querySelectorAll('div p');
    var elem = document.querySelectorAll('*[class="name"]');    // any elems with same class name
    var array = [].slice.call(elem);        // get array from NodeList object
})();

/* GET NODE ELEMENT */
(function () {
    "use strict";
    var elem = document.getElementById('id');
    var childNodesName = [];
    if (elem.hasChildNodes()) {
        var children = elem.childNodes;      // .parentNode
        for (var i = 0; i < children.length; i++)
            childNodesName.push(children[i].nodeName);
    }
})();

/* GET AND SET ATTRIBUTE */
(function () {
    "use strict";
    var atr = document.getElementById('one').getAttribute("data-role");
    atr.setAttribute("data-role", atr);
})();

/* FRAGMENT, NODE ELEMENT, TEXT NODE */
(function () {
    "use strict";
    var fragment = document.createDocumentFragment();       // fragments for adding elems
    var p = document.createElement('p');
    var span = document.createElement('span'); span.innerText = 'text';
    p.appendChild(span);
    fragment.appendChild(p);
    document.body.appendChild(fragment);

    var oldNode = document.getElementById('id');        // fragments for updating elems
    var newNode = oldNode.cloneNode(true);
    // work with newNode
    oldNode.parentNode.replaceChild(newNode, oldNode);

    var elements = document.getElementsByTagName('p');      // add to a list of elems
    elements[0].parentNode.appendChild(p);

    var div = document.getElementById('id');
    var elems = div.getElementsByTagName('p');  // retrieve a collection of 'p' from 'div'
    var newElem = document.createElement('span');
    div.insertBefore(newElem, elems[3]);

    var text = document.createTextNode("text");
    var p = document.createElement('p').appendChild(text);
})();

/* DELETE NODE ELEMENT */
(function () {
    "use strict";
    var one = document.getElementById('one');
    var set = one.getElementsByTagName('p');
    one.removeChild(set[0]);
})();

/* ADD ID, CLASS IDENTIFIER */
(function () {
    "use strict";
    elem.setAttribute('id', 'id-name');
    elem.setAttribute('class', 'class-name');
    elem.classList.add('class-name');       // .remove
})();

/* ADD CALLBACKS TO ARRAY OF ELEMS */
(function () {
    "use strict";
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
})();

/* STYLES */
(function () {
    "use strict";
    elem.style.backgroundColor = 'red';
    elem.setAttribute('style', 'background-color: red; color: white;');
})();

/* POPUP OVERLAY */
(function (global) {
    "use strict";
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
})(window);

/* EVENTS */
(function () {
    "use strict";
    var p = document.getElementById('id');
    if (document.addEventListener) {    // W3C
        p.addEventListener('click', myHandler, false);
    } else if (document.attachEvent) {  // IE
        p.attachEvent('onclick', myHandler);
    } else {        // last resort
        p.onclick = myHandler;
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
})();

/* BACKGROUND THREAD */
(function () {
    "use strict";
    var ww = new Worker('ww.js');
    ww.onmessage = function (event) {
        // subscribe to the event and receive updates via 'event.data'
    };
})();
(function () {
    "use strict";
    postMessage("post event before start");
    // logic here
    postMessage("post event before end");
})();       // ww.js file

/* MAKE REQUEST TO THE SERVER */
(function () {
    "use strict";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {      // provide a callback to the event
        if ((xhr.readyState === 4) && (xhr.status === 200)) {
            document.body.innerHTML += '<div>' + xhr.responseText + '</div>';
        }

    };
    xhr.open("GET", "page.html", true);     // method, url, asynchronous
    xhr.send("");
})();

/* JQUERY */
(function (global) {
    "use strict";
    var $ = global.jQuery;

    var windowHeight = $(window).height();
    $('selector').on('click', function () {
        $('body').scrollTop(windowHeight);
    });

    $(window).scroll(function () {
        var div = $('div').height();
        if ($(window).scrollTop() > (div / 4))
            $('selector').animate({top: div + 100}, 1000);
    });

})(window);
