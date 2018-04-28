function singleElemSelector() {
    var elem = document.getElementById('id')
    var elem = document.querySelector('div p')
    var elem = document.querySelector("[data-role='p']")
    }
function collectionsSelector() {
    // html collection, methods .length and .item(index)
    var elem = document.getElementsByTagName('p')      // life collection
    var elem = document.getElementsByClassName('name')
    // node elements collection, methods .length and .item(index)
    var elem = document.querySelectorAll('div p')
    var elem = document.querySelectorAll('*[class="name"]')    // any elems with same class name
    
    // get array from NodeList arr like object
    var arr = [].slice.call(htmlCollection)
    var arr = Array.from(htmlCollection)
    let arr = [...htmlCollection]
    }
function getNodeTree() {
    {   // get all children
        var elem = document.getElementById('id')
        var childNodesName = []
        if (elem.hasChildNodes()) {
            var children = elem.childNodes      // .parentNode
            for (var i = 0 i < children.length i++)
                childNodesName.push(children[i].nodeName)
        }
    }
    {   // get all parents
        let currentNode = e.target
        let parentNodes = []
        while (currentNode) {
            if (currentNode.nodeName === "BODY") {
                break
            }
            parentNodes.push(currentNode)
            currentNode = currentNode.parentNode
        }
        for (let i = 0 i < parentNodes.length i += 1) {
            if (parentNodes[i].getAttribute("svz-attr") === "vkb") {
                return void 0
            }
        }
        // logic here if nodeTree does not have required attr
    }
    }

function getSetAttr() {
    var atr = document.getElementById('one').getAttribute("data-role")
    atr.setAttribute("data-role", atr)
    var img = document.querySelector('img') 
    img.setAttribute("src", "url")
    }

function fragment() {
    var fragment = document.createDocumentFragment()
    var p = document.createElement('p')
    var span = document.createElement('span')
    span.innerText = 'text'
    p.appendChild(span)
    fragment.appendChild(p)
    document.body.appendChild(fragment)

    var oldNode = document.getElementById('id')
    var newNode = oldNode.cloneNode(true)
    oldNode.parentNode.replaceChild(newNode, oldNode)

    var elements = document.getElementsByTagName('p')      // add to the list of elems
    elements[0].parentNode.appendChild(p)

    var div = document.getElementById('id')
    var elems = div.getElementsByTagName('p')
    var newElem = document.createElement('span')
    div.insertBefore(newElem, elems[3])

    var text = document.createTextNode("text")
    var p = document.createElement('p').appendChild(text)
    }
function deleteNode() {
    var one = document.getElementById('one')
    var set = one.getElementsByTagName('p')
    one.removeChild(set[0])
    }

function addIdCalss() {
    elem.setAttribute('id', 'id-name')
    elem.setAttribute('class', 'class-name')
    elem.classList.add('class-name')       // .remove .toggle
    }

function contentManipulation() {
    elem.innerHTML = ""        // text in 'elem' plus all inner tags
    elem.textContent = ""      // only text in 'elem' plus text from all inner tags
    }
function addFunctionalityToArray() {
    var elem = document.querySelectorAll('div p')
    var array = [].slice.call(elem)
    array.forEach(namedFunc)        // pass each obj from array to namedFunc as an arg
    function namedFunc(item) {      // add event listener for each object
        item.addEventListener("click", function (event) {
            event.preventDefault()
            var atr = item.getAttribute("data-image-url")    // get any attribute
            item.setAttribute("src", atr)      // set any attribute
            item.textContent = "any text"      // set any content text
        })
    }
    }

function styles() {
    /*
        { box-sizing: border-box }        // padding and border will be included in the width

    */

    /* intrinsic ration based on content aspect ration
        .container { position: relative padding-bottom: 56.25% height: 0 }
        .content { position: absolute width: 100% height: 100% top: 0 left: 0 }
    */

    /* small resolution styles first, then
        @media (min-width: 400px) {}
        @media (min-width: 600px) {}
    */
    
    elem.style.backgroundColor = 'red'
    elem.setAttribute('style', 'background-color: red color: white')
    }
function popupOverlay() {
    function displayPopup() {
        var overlay = document.createElement('div').setAttribute('id', 'overlay')
        document.body.appendChild(overlay)
        overlay.onclick = restore
    }
    function restore() {
        document.body.removeChild(document.getElementById('overlay'))
    }
    global.onload = function () {
        displayPopup()
    }
    }
                                                                                                                                                                                                             
function mutationObserver() {}

function events() {
    var div = document.getElementById('btn-wrapper')
    if (document.addEventListener) {    // W3C
        div.addEventListener('click', myHandler, false)
    } else if (document.attachEvent) {  // IE
        div.attachEvent('onclick', myHandler)
    } else {        // last resort
        div.onclick = myHandler
    }

    function myHandler(e) {
        var src, parts
        e = e || window.event      // get event
        src = e.target || e.srcElement // get source element

        <div id="btn-wrapper"> // one element for all buttons
        if (src.nodeName.toLowerCase() !== "button") return

        parts = src.innerHTML.split(': ')      // actual logic
        parts[1] = parseInt(parts[1], 10) + 1
        src.innerHTML = parts[0] + ': ' + parts[1]

        if (typeof e.stopPropagation === "function")    // prevent bubbling
            e.stopPropagation()
        if (typeof e.cancelBubble !== "undefined")
            e.cancelBubble = true
        if (typeof e.preventDefault === "function")     // prevent default action
            e.preventDefault()
        if (typeof e.returnValue !== "undefined")
            e.returnValue = false
    }
    }
function loading() {
    {   // preloading
        <link rel="prefetch" href="name.jpg">
        let image = new Image()
        image.src = "name.jpg"
    }
    {   // lazy loading
        function scriptLoaded() { /* logic here */ }
        let src = document.createElement("script")
        src.src = "name.js"
        document.head.appendChild(src)
        src.onload = scriptLoaded      // "onload" realy means "on done execute"
        src.onreadystatechange = function () {
            if (src.readyState === "laded" || src.readyState === "complete") {
                scriptLoaded()
            }
        }
    }
    }
function css() {
    html { box-sizing: border-box }
    *, *:before, *:after { box-sizing: inherit }

    align-items             // "y" axis position, if parent = height, items will stretch to fit
    align-items: stretch    // initial value
    align-self              // target single item
    align-content           // only if there is more height in your flex container than required to display items

    justify-content:stretch // "x" axis position
    margin-left: auto       // first, second elems will be justified to the left, third to the right

    flex-grow:              // how much of the positive free space does this item get
    flex-shrink:            // how much negative free space can be removed from this item
    flex-basis:             // what is the size of the item before growing and shrinking happens
    }
