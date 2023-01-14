var observer = new MutationObserver(function (mutations) {
    var div = document.querySelector("div.TBA7qc div.J09ahd.TanRXd.l94Mhe");
    if (div) {
        div.remove();
        observer.disconnect();
    }
});

observer.observe(document, { childList: true, subtree: true });

var observer2 = new MutationObserver(function (mutations) {
    var div = document.querySelector("div.qOsM1d.X8eWK.qbOKL-NBtyUd");
    if (div) {
        div.remove();
        observer2.disconnect();
    }
});

observer2.observe(document, { childList: true, subtree: true });

var newDiv = document.querySelector("div.qOsM1d.wBon4c");
if (newDiv) {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("width", "20");
  rect.setAttribute("height", "20");
  rect.setAttribute("style", "fill:#E9E612;stroke-width:3;stroke:rgb(0,0,0)");
  svg.appendChild(rect);
  newDiv.appendChild(svg);
}


console.log("Google Calendar Legend loaded succesfully.")