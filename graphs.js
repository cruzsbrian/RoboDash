var graphs = [];
var graphData = [];

// define graph object
function Graph() {
	// blank settings (shows placeholders in inputs)
	this.settings = {
		title: '',
		valueAxes: [{
			displayName: '',
			dataField: '',
			min: '',
			max: ''
		}]
	};

	// variable to hold AmCharts object
	this.chart = null;
}

function makeGraphView($panel) {
	// get id (0-indexed) for the graph
	var id = parseInt($panel.attr("id"));

	// make the graphView div to hold it
	var $graphView = $(document.createElement("div")).addClass("graphview");
	$graphView.attr("id", "graph" + id);

	// create a Graph object
	var graph = new Graph();
	graphs[id] = graph;

	// configure the graph when clicked
	$graphView.click(function () {
		configGraph(id);
	});

	// tell the user what to do with a text hint
	$placeholderText = $("<p>Click to configure a graph</p>");
	$graphView.append($placeholderText);

	// put the thing in the place
	$panel.append($graphView);
}

function configGraph(id) {
	// load the settings for that graph
	loadGraphSettings(id);
	showSettings($(".graphSettings"));

	// tell the button what graph to alter when saving
	$(".graphSettings .settings-button").attr("id", id);
}

function loadGraphSettings(id) {
	// get the graph object's settings
	var settings = graphs[id].settings;

	// set the title value
	$("#graphSettingsForm #title").val(settings.title);

	// clear all the value axes and the line breaks between them
	$("#value-axes-group input").remove();
	$("#value-axes-group br").remove();

	// add all the new value axes
	for (var i = 0; i < settings.valueAxes.length; i++) {
		addValueAxisToForm(settings.valueAxes[i]);
	}
}

function saveGraphSettings(button) {
	var id = parseInt($(button).attr("id"));

	var settingsForm = document.forms["graphSettings"];

	graphs[id].settings.title = settingsForm["title"].value;

	hideSettings($(".graphSettings"));
}

function addValueAxisToForm(axisSettings) {
	// allow leaving out axisSettings to go to blank axis
	axisSettings = axisSettings || {
		displayName: '',
		dataField: '',
		min: '',
		max: ''
	};

	// find highest axis number
	var axisInputs = $(".value-display");
	var largestId = 0;
	for (var i = 0; i < axisInputs.length; i++) {
		var id = parseInt($(axisInputs[i]).attr("id"));
		if (id > largestId) {
			largestId = id;
		}
	}

	// make new inputs
	var $displayNameInput = $("<input name='value-display" + (largestId + 1)
		+ "' class='value-display' id='" + (largestId + 1)
		+ "' type='text' placeholder='Display Name' value='" + axisSettings.displayName
		+ "'>");
	var $dataFieldInput = $("<input name='value-data" + (largestId + 1)
		+ "' class='value-data' id='" + (largestId + 1)
		+ "' type='text' placeholder='Data Field' value='" + axisSettings.dataField
		+ "'>");
	var $minInput = $("<input name='value-min" + (largestId + 1)
		+ "' class='value-min' id='" + (largestId + 1)
		+ "' type='text' placeholder='Min (leave blank for auto)' value='" + axisSettings.min
		+ "'>");
	var $maxInput = $("<input name='value-max" + (largestId + 1)
		+ "' class='value-max' id='" + (largestId + 1)
		+ "' type='text' placeholder='Max (leave blank for auto)' value='" + axisSettings.max
		+ "'>");

	// add line break followed by the two inputs before the plus button
	// make sure not to add line breaks before the first set of inputs
	if (largestId != 0) {
		$("<br><br>").insertBefore($("a.add-value-axis"));
	}
	$displayNameInput.insertBefore($("a.add-value-axis"));
	$dataFieldInput.insertBefore($("a.add-value-axis"));
	$("<br><br>").insertBefore($("a.add-value-axis"));
	$minInput.insertBefore($("a.add-value-axis"));
	$maxInput.insertBefore($("a.add-value-axis"));
}

