function showSaveMenu() {}

// returns a JSON object containing the layouts of the graph and log tabs
function generateLayout() {
    var result = {};
    var graphs = document.getElementById("Graphs");
    var logs = document.getElementById("Log");

    result.graphs = domJSON.toJSON(graphs);
    result.logs = domJSON.toJSON(logs);

    return result;
}

// replaces the graph and log tabs with the layout in data
function loadLayout(data) {
    var graphs = document.getElementById("Graphs");
    var logs = document.getElementById("Log");

    graphs.replaceWith(domJSON.toDOM(data.graphs));
    logs.replaceWith(domJSON.toDOM(data.logs));
}

// creates a link with the data as a download and clicks it
function download(data, filename) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
