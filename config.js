var data = []; //data storage; legendname, legendcolor
var numFields = 0;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('add').addEventListener("click", addInput);
    document.getElementById('save').addEventListener("click", saveData);
    document.getElementById('newsection').addEventListener("click", addSection)
    document.getElementById('clear').addEventListener("click", clearData);
    document.getElementById('delete').addEventListener("click", removeLastField);

});

function addSection() {
    document.body.style.width = "400px";
}

//clear all the data
function clearData() {
    chrome.storage.local.getBytesInUse(null, function (bytesInUse) {
        if (bytesInUse > 0) {
            chrome.storage.local.clear();
        }
    });
    //remove all fields
    var config = document.getElementById("config");
    while (config.firstChild) {
        config.removeChild(config.firstChild);
    }
    //reset field count
    numFields = 0;

    console.log("Data cleared!");
    console.log(data);
}

function removeLastField() {
    var config = document.getElementById("config");
    for(let i = 0;i < 2; i++) {
        config.removeChild(config.lastChild);
    }
    numFields = numFields - 1;
}

//add a field
function addInput() {
    var legendName = document.createElement('p');
    var legendLabel = document.createElement('label');
    var legendColor = document.createElement('select');
    var input = document.createElement('input');
    input.type = "text";
    input.id = "input" + numFields;
    input.name = "input" + numFields;
    input.style.width="100px";
    legendName.innerHTML = "Legend Name ";
    legendName.appendChild(input);
    legendLabel.innerHTML = "Choose color: ";
    legendLabel.for = "legendcolor";
    legendLabel.appendChild(legendColor);
    legendColor.id = "color" + numFields;
    legendColor.style.width="100px";
    var options = ["Tomato", "Flamingo", "Tangerine", "Sage", "Basil", "Peacock", "Blueberry", "Lavender", "Grape", "Graphite"];
    var colors = ["#d50000", "#e67c73", "#f4511e", "#33b679", "#0a8043", "#326872", "#4050b5", "#7886cb", "#8e24aa", "#616161"];

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = options[i];
        option.style.backgroundColor = colors[i];
        legendColor.appendChild(option);
    }
    console.log(legendName);
    document.getElementById('config').appendChild(legendName);
    document.getElementById('config').appendChild(legendLabel);

    numFields++;
}

//save data
function saveData() {
    let fieldcount = numFields;
    for (let i = 0; i <= fieldcount - 1; i++) {
        var { lName, lColor } = {
            lName: document.getElementById('input' + i).value,
            lColor: document.getElementById('color' + i).value
        };
        data.push({ lName, lColor });
    }
    //clear previous saved data before saving new
    chrome.storage.local.clear();
    //save data
    chrome.storage.sync.set({ data }, function () {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
        else console.log("Succesfully saved!");
    });
    chrome.tabs.reload();
}

//load everything when popup gets opened
document.body.onload = function () {
    chrome.storage.sync.get("data", function (items) {
        if (!chrome.runtime.error) {
            let data = items.data;
            for (let i = 0; i < data.length; i++) {
                addInput();
            }
            fillExistingData(data);
        }
    });
}

//makes sure saved fields contain their data
function fillExistingData(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i] != null) {
            document.getElementById('input' + i).value = data[i].lName;
            document.getElementById('color' + i).value = data[i].lColor;
        }
    }
}
