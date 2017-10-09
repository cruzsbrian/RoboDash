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

    // make new inputs
    var $keyInput = $("<input name='key" + (largestId + 1)
            + "' class='constant-key' id='" + (largestId + 1)
            + "' type='text' placeholder='key' value='" + constant.key
            + "'>");
    var $valInput = $("<input name='val" + (largestId + 1)
            + "' class='constant-val' id='" + (largestId + 1)
            + "' type='text' placeholder='val' value='" + constant.val
            + "'>");

    // add line break followed by the two inputs before the plus button
    // make sure not to add line breaks before the first set of inputs
    if (largestId != -1) {
        $("<br><br>").insertBefore($("a.add-constant"));
    }
    $keyInput.insertBefore($("a.add-constant"));
    $valInput.insertBefore($("a.add-constant"));
}

function clearConstants() {
    $("#constantsForm input").remove();
    $("#constantsForm br").remove();
}

function loadConstants(cList) {
    if (cList.length > 0) {
        clearConstants();
    }

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
        obj: collectConstants()
    };

    send(data);
}

function requestConstantDefaults() {
    var data = {
        type: "request",
        obj: "constants"
    };

    send(data);
}
