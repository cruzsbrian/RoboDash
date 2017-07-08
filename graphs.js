var charts = [];
var chartData = [];

function makeGraphView($panel) {
	var id = $panel.attr("id");
	var $graphView = $(document.createElement("div")).addClass("graphview");
	$graphView.attr("id", "graph" + id);

	// configure the graph when clicked
	$graphView.click(function () {
		configGraph($graphView);
	});

	$placeholderText = $("<p>Click to configure a graph</p>");
	$graphView.append($placeholderText);

	$panel.append($graphView);
}

function configGraph($graphView) {
	var id = $graphView.parent().attr("id");

	clearGraphSettings();
	var graphSettings = showGraphSettings();

	var chart = new AmCharts.AmSerialChart();
	chart.dataProvider = chartData;

	chart.categoryField = "t";
}

function clearGraphSettings() {
	// clear all graph settings to defaults
}

function showGraphSettings() {
	$(".shade").show();
	$(".shade").css("opacity", "0.25");
	$(".graphSettings").show();

	$(".shade").click(hideGraphSettings);
}

function hideGraphSettings() {
	$(".graphSettings").hide();
	$(".shade").css("opacity", "0.25");
	$(".shade").hide();
}

