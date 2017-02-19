console.log('Loaded!');

// Change the  main text
var element = document.getElementById('main-text');
element.innerHTML = " Changed thru JS !";

//Move the image on click
var img = document.getElementById('madi');
img.onclick = function() {
    img.style.marginLeft = '100px';
};