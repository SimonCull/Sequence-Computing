function populateCssSelect() {
    debugger;
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

window.addEventListener("DOMContentLoaded", populateCssSelect());