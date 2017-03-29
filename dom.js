
/* SELECTORS */
var elem = document.getElementById('id');
var elem = document.querySelector('div p');
var elem = document.querySelector("[data-role='p']");


/* COLLECTIONS */
// html collection, methods .length and .item(index)
var elem = document.getElementsByTagName('p');      // life collection
// node elements collection, methods .length and .item(index)
var elem = document.querySelectorAll('div p');
var array = [].slice.call(elem);        // get array from NodeList object


/* GET ELEMENTS */
var elem = document.getElementById('id');
var childNodesName = [];
if (elem.hasChildNodes()) {
    var children = elem.childNodes;      // .parentNode
    for (var i = 0; i < children.length; i++)
        childNodesName.push(children[i].nodeName);
}


/* GET AND SET ATTRIBUTES */
var atr = document.getElementById('one').getAttribute("data-role");
elem.setAttribute("data-role", atr);


/* CREATE ELEMENT */
var p = document.createElement('p');
var span = document.createElement('span'); span.innerText = 'text';
p.appendChild(span);
var elements = document.getElementsByTagName('p');
elements[0].parentNode.appendChild(p);


/* ADD CLASS IDENTIFIER */
var name = "name";
document.body.classList.add(name);


/* ADD CALLBACKS TO ELEMS */
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

