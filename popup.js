function createFields() {
    // Code to create fields and dropdown menus
    var form = document.getElementById("form");
    var field = document.createElement("input");
    field.setAttribute("type", "text");
    field.setAttribute("name", "field");
    form.appendChild(field);
    var select = document.createElement("select");
    select.setAttribute("name", "dropdown");
    var option1 = document.createElement("option");
    option1.setAttribute("value", "option1");
    option1.innerHTML = "Option 1";
    select.appendChild(option1);
    var option2 = document.createElement("option");
    option2.setAttribute("value", "option2");
    option2.innerHTML = "Option 2";
    select.appendChild(option2);
    form.appendChild(select);
  }
  