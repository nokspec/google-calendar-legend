var dict = {Tomato: "#d50000", Flamingo: "#e67c73", Tangerine: "#f4511e", Sage: "#33b679", Basil: "#0a8043", Peacock: "#326872", Blueberry: "#4050b5", Lavender: "#7886cb", Grape: "#8e24aa", Graphite: "#616161"};

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
        let legendhex;
        for(const [key, value] of Object.entries(dict)) {
            if(legendcolor == key) {
                legendhex = value;
            }
        }

        console.log(legendname + legendcolor);
        // Create a new div
        let newDiv = document.createElement(`div`);
        // Set the innerHTML of the div
        newDiv.innerHTML = `<p style="margin-left: 23px; color: #3c4043;"> <span style="background-color: ${legendhex}; width: 17px; border-radius: 2px; display: inline-block;">&nbsp;</span> ${legendname}</p>`;
        // Append the new div to the element
        document.querySelector(".qOsM1d.wBon4c").appendChild(newDiv);
    }
}


