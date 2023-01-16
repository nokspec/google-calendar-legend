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

getData();

async function getData() {
    let data1 = await new Promise(resolve => {
        chrome.storage.sync.get("data", function (items) {
            if (!chrome.runtime.error) {
                resolve(items.data);
                
            }
        });
    });
    createDivs(data1);
    return data1;
}

// Function to create new divs
function createDivs(data) {
    for (let i = 0; i < data.length; i++) {
        let legendname = data[i].lName;
        let legendcolor = data[i].lColor;

        // Create a new div
        let newDiv = document.createElement(`div`);
        // Set the innerHTML of the div
        newDiv.innerHTML = `<p>${legendname} <span style="background-color: ${legendcolor}; width: 17px; display: inline-block;">&nbsp;</span></p>`;
        // Append the new div to the element with class qOsM1d wBon4c
        document.querySelector(".qOsM1d.wBon4c").appendChild(newDiv);
    }
}


