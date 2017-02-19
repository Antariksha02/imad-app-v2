console.log('Loaded!');

// Change the  main text
var element = document.getElementById('main-text');
element.innerHTML = " Changed thru JS !";

//Move the image on click
var marginLeft  = 0;

function moveRight(){
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}

var img = document.getElementById('madi');
img.onclick = function() {
    var inetrval = setInterval(moveRight, 100);
};