var numFields;

// retrieve the stored data when the popup is opened
var numFields;

// retrieve the stored data when the popup is opened
window.onload = function () {
    chrome.storage.local.get("numFields", function (items) {
        if (items.numFields) {
            numFields = items.numFields;
            for (var i = 0; i < numFields; i++) {
                chrome.storage.local.get("input" + i, function (items) {
                    var inputValue = items["input" + i];
                });
                chrome.storage.local.get("color" + i, function (items) {
                    var colorValue = items["color" + i];
                });
                var legendName = '<p>Legend Name <input type="text" id="input' + i + '" name="input' + i + '" value="' + inputValue + '"/> ';
                var legendLabel = '<label for="legendcolor">Choose color: </label> <select id="color' + i + '" value="' + colorValue + '"> '
                var legendColor = '<option id="tomato">Tomato</option> <option id="flamingo">Flamingo</option> <option id="tangerine">Tangerine</option> <option id="sage">Sage</option> <option id="basil">Basil</option> <option id="peacock">Peacock</option> <option id="blueberry">Blueberry</option> <option id="lavender">Lavender</option> <option id="grape">Grape</option> <option id="graphite">Graphite</option>  </select> </p> <br>';
                document.getElementById('config').innerHTML += legendName += legendLabel += legendColor;
            }
        } else {
            numFields = 0;
        }
    });
}


document.getElementById('add').addEventListener("click", addInput);

function addInput() {
    var legendName = '<p>Legend Name <input type="text" id="input' + numFields + '" name="input' + numFields + '"/> ';
    var legendLabel = '<label for="legendcolor">Choose color: </label> <select id="color' + numFields + '"> '
    var legendColor = '<option id="tomato">Tomato</option> <option id="flamingo">Flamingo</option> <option id="tangerine">Tangerine</option> <option id="sage">Sage</option> <option id="basil">Basil</option> <option id="peacock">Peacock</option> <option id="blueberry">Blueberry</option> <option id="lavender">Lavender</option> <option id="grape">Grape</option> <option id="graphite">Graphite</option>  </select> </p> <br>';
    document.getElementById('config').innerHTML += legendName += legendLabel += legendColor;
    numFields++;
    console.log("Added!");
}

document.getElementById('save').addEventListener("click", saveData);

function saveData() {
    let data = {};
    for (var i = 0; i < numFields; i++) {
        var name = document.getElementById("input" + i).value;
        var color = document.getElementById("color" + i).value;
        data["input" + i] = name;
        data["color" + i] = color;
    }
}