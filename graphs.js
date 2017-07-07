var charts = [];
var chartData = [];

function makeGraphView($panel) {
	var id = $panel.attr("id");
	var $graphView = $(document.createElement("div")).addClass("graphview");
	$graphView.attr("id", "graph" + id);

	$placeholderText = $("<p>Click to configure a graph</p>");
	$graphView.append($placeholderText);

	$panel.append($graphView);
}

