console.log('Loaded!');

// Change the  main text
var element = document.getElementById('main-text');
element.innerHTML = " Changed thru JS !";

//Move the image on click
var img = document.getElementById('madi');

img.onclick = fumction() {
    img.style.leftmargin = '100px';
}