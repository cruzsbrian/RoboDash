var ws;
var dataStartTime;

ws.onopen = function(evt) {};

ws.onmessage = function(evt) {
	console.log(evt.data)

	// determine if data is new graph data or a new log

	// if it's graph data
	// set the time startTime if it hasn't been set yet
	// calculate the time since startTime and add it to the data object
	// append the data object to graphData from graphs.js

	// if it's log data
	// pass the object to addLog from log.js
};

// show the connection dialog
function showConnectionSettings() {
	showSettings($(".connectionSettings"));
}

// get settings from dialog and open websocket
function connect() {

}
