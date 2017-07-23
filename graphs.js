var graphs = [];
var graphData = [];

// define graph object
function Graph() {
	// blank settings (shows placeholders in inputs)
	this.settings = {
		title: '',
		min: '',
		max: '',
		valueAxes: [{
			displayName: '',
			dataField: ''
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

// use AmCharts to write a graph to the DOM given a Graph object's id
function makeGraph(id) {
	var g = graphs[id];

	g.chart = new AmCharts.AmSerialChart();
	g.chart.fontFamily = "Arial";
	g.chart.dataProvider = graphData;

	// set time as horizontal axis
	g.chart.categoryField = "t";

	// make the axis
	var axis = new AmCharts.ValueAxis();
	if (g.settings.min != '') {
		axis.minimum = parseInt(g.settings.min);
	}
	if (g.settings.max != '') {
		axis.maximum = parseInt(g.settings.max);
	}
	g.chart.addValueAxis(axis);

	// make each line by looping through the settings
	for (var i = 0; i < g.settings.valueAxes.length; i++) {
		var axisSettings = g.settings.valueAxes[i];

		// make the graph (line)
		var lineGraph = new AmCharts.AmGraph();
		lineGraph.type = "line";
		lineGraph.valueField = axisSettings.dataField;
		lineGraph.title = axisSettings.displayName;

		// define a function to round the value and convert it to a string for the balloon text
		lineGraph.balloonFunction = function(graphdata, graphobject) {
			var val = parseFloat(graphdata.values.value).toFixed(3);
			return val.toString();
		};

		g.chart.addGraph(lineGraph);
	}

	// add cursor to go through data
	var cursor = new AmCharts.ChartCursor();
	cursor.cursorPosition = "mouse";
	g.chart.addChartCursor(cursor);

	// add legend to tell lines apart
	var legend = new AmCharts.AmLegend();
	legend.align = "left";
	legend.markerType = "line";
	legend.markerBorderThickness = 3;
	legend.valueText = "";
	g.chart.addLegend(legend);

	g.chart.write("graph" + id);

	// create settings button
	var $settingsButton = $("<a class='graph-settings-button clickable' id='" + id + "'>&#x26ed;</a>");
	$settingsButton.click(function() {
		configGraph(id);
	});
	$("#graph" + id).append($settingsButton);

	// unbind click from the graphView element
	$("#graph" + id).unbind("click");
}

// open dialog so user can edit settings of a graph
function configGraph(id) {
	// load the settings for that graph
	loadGraphSettings(id);
	showSettings($(".graphSettings"));

	// tell the button what graph to alter when saving
	$(".graphSettings .settings-button").attr("id", id);
}

// settings stuff
// load settings from a Graph object into a settings dialog
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
	graphs[id].settings.min = settingsForm["min"].value;
	graphs[id].settings.max = settingsForm["max"].value;

	// count number of value axes by counting number of .value-display inputs
	var numAxes = $("#graphSettingsForm input.value-display").length;

	// save each value axis
	for (var i = 0; i < numAxes; i++) {
		// get each value from the input
		var m_displayName = settingsForm["value-display" + i].value;
		var m_dataField = settingsForm["value-data" + i].value;

		// put them in a valueAxis settings object
		var axis = {
			displayName: m_displayName,
			dataField: m_dataField,
		};

		// add the axis to the settings object
		graphs[id].settings.valueAxes[i] = axis;
	}

	hideSettings($(".graphSettings"));
	makeGraph(id);
}

function addValueAxisToForm(axisSettings) {
	// allow leaving out axisSettings to go to blank axis
	axisSettings = axisSettings || {
		displayName: '',
		dataField: ''
	};

	// find highest axis number
	var axisInputs = $(".value-display");
	var largestId = -1;
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

	// add line break followed by the two inputs before the plus button
	// make sure not to add line breaks before the first set of inputs
	if (largestId != -1) {
		$("<br><br>").insertBefore($("a.add-value-axis"));
	}
	$displayNameInput.insertBefore($("a.add-value-axis"));
	$dataFieldInput.insertBefore($("a.add-value-axis"));
}

