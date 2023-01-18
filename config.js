var data = []; //data storage, legendname, legendcolor
var numFields = 0;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('add').addEventListener("click", addInput);
    document.getElementById('save').addEventListener("click", saveData);
    document.getElementById('clear').addEventListener("click", clearData);
});


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

//add a field
function addInput() {
    var legendName = document.createElement('p');
    var legendLabel = document.createElement('label');
    var legendColor = document.createElement('select');
    var input = document.createElement('input');
    input.type = "text";
    input.id = "input" + numFields;
    input.name = "input" + numFields;
    legendName.innerHTML = "Legend Name ";
    legendName.appendChild(input);
    legendLabel.innerHTML = "Choose color: ";
    legendLabel.for = "legendcolor";
    legendLabel.appendChild(legendColor);
    legendColor.id = "color" + numFields;
    var options = ["Tomato", "Flamingo", "Tangerine", "Sage", "Basil", "Peacock", "Blueberry", "Lavender", "Grape", "Graphite"];
    var colors = ["#ff6347", "#ffa07a", "#ffa500", "#708090", "#008080", "#6a5acd", "#87cefa", "#e6e6fa", "#8a2be2", "#a9a9a9"];

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
