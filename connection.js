var ws;

function addData(data) {
	// determine if data is new graph data or a new log
	if (data.type === "graph") {
		// append the data object to graphData from graphs.js
		graphData[graphData.length] = data.obj;
		updateGraphs();
	} else if (data.type === "log") {
		// pass the object to addLog from log.js
		addLog(data.obj);
	}
}

// show the connection dialog
function showConnectionSettings() {
	showSettings($(".connectionSettings"));

	// have the form connect with submitted
	$("#connectionSettingsForm").submit(function(e) {
		connect();
		e.preventDefault();
	});
}

// get settings from dialog and open websocket
function connect() {
	var settingsForm = document.forms["connectionSettings"];

	var ip = settingsForm["ip"].value;
	var port = settingsForm["port"].value;

	ws = new WebSocket("ws://" + ip + ":" + port + "/");

	ws.onopen = function(evt) {
		console.log("connected");
	};

	ws.onmessage = function(evt) {
		addData(JSON.parse(evt.data));
	};

	hideSettings($(".connectionSettings"));
}

function send(data) {
	console.log(data);
	if (ws && ws.readyState === ws.OPEN) {
		ws.send(JSON.stringify(data));
	} else {
		console.log("Sending failed b/c WebSocket is not open.");
	}
}