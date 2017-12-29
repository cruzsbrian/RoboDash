function addConstantToForm(constant) {
    // allow leaving out constant to go to blank constant
    constant = constant || {
        key: '',
        val: ''
    };

    // find highest constant number
    var constantInputs = $(".constant-key");
    var largestId = -1;
    for (var i = 0; i < constantInputs.length; i++) {
        var id = parseInt($(constantInputs[i]).attr("id"));
        if (id > largestId) {
            largestId = id;
        }
    }

    // id for the new constants
    var id = largestId + 1;

    // make the delete button
    var $deleteButton = $("<a class='delete-constant clickable' id='" + id + "'>-</a>");
    $deleteButton.click(function() {
        removeConstant(id);
    });

    // make new inputs
    var $keyInput = $("<input name='key" + id
            + "' class='constant-key' id='" + id
            + "' type='text' placeholder='key' value='" + constant.key
            + "'>");
    var $valInput = $("<input name='val" + id
            + "' class='constant-val' id='" + id
            + "' type='text' placeholder='val' value='" + constant.val
            + "'>");

    // add line break followed by the two inputs before the plus button
    $("<br id='" + id + "'><br id='" + id + "'>").insertBefore($("a.add-constant"));
    $deleteButton.insertBefore($("a.add-constant"));
    $keyInput.insertBefore($("a.add-constant"));
    $valInput.insertBefore($("a.add-constant"));
}

function clearConstants() {
    $("#constantsForm input").remove();
    $("#constantsForm br").remove();
    $(".delete-constant").remove();
}

function removeConstant(id) {
    // this one gets the inputs and anchor
    $(".constants-inputs [id=" + id + "]").remove();
}

function loadConstants(cList) {
    // if the robot send no constants, leave the blank inputs
    if (cList.length > 0) {
        clearConstants();
    }

    // add all the constants
    for (var i = 0; i < cList.length; i++) {
        addConstantToForm(cList[i]);
    }
}

// returns an array of all the constants
function collectConstants() {
    var result = [];

    var constantsForm = document.forms["constants"];
    var constantInputs = $(".constant-key");
    for (var i = 0; i < constantInputs.length; i++) {
        var id = $(constantInputs[i]).attr("id");

        var key = constantsForm["key" + id].value;
        var val = constantsForm["val" + id].value;
        result.push({key: key, val: val});
    }

    return result;
}

// send constants to the robot
// make defaults true if they should become defaults
function sendConstants(defaults) {
    defaults = defaults || false;

    var data = {
        type: "constants",
        defaults: defaults,
        constants: collectConstants()
    };

    send(data);
}

function requestConstantDefaults() {
    var data = {
        type: "request",
        requestedName: "constants"
    };

    send(data);
}
