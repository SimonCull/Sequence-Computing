function populateCssSelect() {
    var styles = ['Basic'];
    var opt;
    var cssSelect = document.getElementById("cssSelecter");
    for (var i = 0; i< styles.length; i++){
        opt = document.createElement('option');
        opt.innerHTML = styles[i];
        opt.value = styles[i]+'.css';
        cssSelect.appendChild(opt);
    }
}

function toggleCssOverlay() {
    var cssSelectBody = document.getElementById("cssSelectBody");
    var cssSelectButton = document.getElementById("cssSelectButton");
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