var ws;

function addData(data) {
    // determine if data is new graph data or a new log
    if (data.type === "data") {
        updateGraphs(data.graph);
        addLog(data.log);
    } else if (data.type === "constants") {
        loadConstants(data.constants);
    }
}

// show the connection dialog
function showConnectionSettings() {
    showSettings($(".connectionSettings"));

    // have the form connect with submitted
    $("#connectionSettingsForm").unbind("submit");
    $("#connectionSettingsForm").submit(function(e) {
        e.preventDefault();
        connect();
    });
}

// get settings from dialog and open websocket
function connect() {
    var settingsForm = document.forms["connectionSettings"];

    var ip = settingsForm["ip"].value;
    var port = settingsForm["port"].value;

    try {
        ws = new WebSocket("ws://" + ip + ":" + port + "/");

        ws.onopen = function(evt) {
            // change connect button to say "connected" and be green
            $("button#connect").text("Connected")
                .addClass("button-green");
        };

        ws.onclose = function(evt) {
            // change connect button back to saying "connect" and normal color
            $("button#connect").text("Connect")
                .removeClass("button-green");
        };

        ws.onmessage = function(evt) {
            addData(JSON.parse(evt.data));
        };

        ws.onerror = function(evt) {
            // the websocket will throw an error to the console itself
            flashConnectionRed();
        }
    } catch(err) {
        console.log("Error opening websocket");
        console.log(err.message);

        flashConnectionRed();
    }

    hideSettings($(".connectionSettings"));
}

function send(data) {
    if (ws && ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(data));
    } else {
        console.log("Sending failed b/c WebSocket is not open.");
    }
}

function flashConnectionRed() {
    $("button#connect").css("transition", "1.5s");
    $("button#connect").addClass("button-red");
    setTimeout(function() {
        $("button#connect").removeClass("button-red");
    }, 1000);
    setTimeout(function() {
        $("button#connect").css("transition", "");
    }, 2500);
}
