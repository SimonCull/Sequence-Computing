/*jslint
    es6
*/
function populateCssSelect() {
    const styles = ['Basic'];
    let opt;
    const cssSelect = document.getElementById("cssSelecter");
    for (let i = 0; i< styles.length; i++){
        opt = document.createElement('option');
        opt.innerHTML = styles[i];
        opt.value = styles[i]+'.css';
        cssSelect.appendChild(opt);
    }
}

function toggleCssOverlay() {
    const cssSelectBody = document.getElementById("cssSelectBody");
    const cssSelectButton = document.getElementById("cssSelectButton");
    toggleHidden(cssSelectBody);
    toggleHidden(cssSelectButton);
}

function toggleHidden(element){
    if(element.classList.contains("hidden")){
        element.classList.remove("hidden");
    }else{
        element.classList.add("hidden");""
    }
}
window.addEventListener("DOMContentLoaded", populateCssSelect());
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);