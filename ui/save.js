var reader = new FileReader();

function showLoadLayout() {
    $(".loadSettings #title").text("Load Layout");

    // unbind in case it was already used for something else
    $("#loadSettingsForm").unbind("submit");
    $("#loadSettingsForm").submit(function(e) {
        e.preventDefault();

        var form = document.forms["loadSettings"];

        var files = form["loadfile"].files;
        if (files.length > 0) {
            reader.readAsText(files[0]);

            reader.onloadend = function() {
                var data = JSON.parse(reader.result);

                loadLayout(data);
            };
        }

        hideSettings($(".loadSettings"));
    });

    $(".dropdown").removeClass("active");

    showSettings($(".loadSettings"));
}

function showSaveLayout() {
    $(".saveSettings #title").text("Save Layout");

    // unbind in case it was already used for something else
    $("#saveSettingsForm").unbind("submit");
    $("#saveSettingsForm").submit(function(e) {
        e.preventDefault();

        var form = document.forms["saveSettings"];
        var filename = form["savefile"].value;

        download(JSON.stringify(generateLayout()), filename);

        hideSettings($(".saveSettings"));
    });

    $(".dropdown").removeClass("active");

    showSettings($(".saveSettings"));
}

function showLoadData() {
    $(".loadSettings #title").text("Load Data");

    // unbind in case it was already used for something else
    $("#loadSettingsForm").unbind("submit");
    $("#loadSettingsForm").submit(function(e) {
        e.preventDefault();

        var form = document.forms["loadSettings"];

        var files = form["loadfile"].files;
        if (files.length > 0) {
            reader.readAsText(files[0]);

            reader.onloadend = function() {
                var data = JSON.parse(reader.result);

                loadData(data);
            };
        }

        hideSettings($(".loadSettings"));
    });

    $(".dropdown").removeClass("active");

    showSettings($(".loadSettings"));
}

function showSaveData() {
    $(".saveSettings #title").text("Save Data");

    // unbind in case it was already used for something else
    $("#saveSettingsForm").unbind("submit");
    $("#saveSettingsForm").submit(function(e) {
        e.preventDefault();

        var form = document.forms["saveSettings"];
        var filename = form["savefile"].value;

        download(JSON.stringify(collectData()), filename);

        hideSettings($(".saveSettings"));
    });

    $(".dropdown").removeClass("active");

    showSettings($(".saveSettings"));
}

// returns a JSON object containing the layouts of the graph and log tabs
function generateLayout() {
    var result = {};

    result.graphLayout = graphLayout;
    result.logLayout = logLayout;

    result.graphSettings = [];
    for (var i = 0; i < graphs.length; i++) {
        result.graphSettings.push(graphs[i].settings);
    }

    result.logSettings = [];
    for (var i = 0; i < logViews.length; i++) {
        result.logSettings.push(logViews[i].settings);
    }

    return result;
}

function collectData() {
    var result = {};

    result.graphData = graphData;
    result.logData = logData;

    return result;
}

// replaces the graph and log tabs with the layout in data
function loadLayout(data) {
    // build the DOM layouts
    buildLayout("Graphs", data.graphLayout);
    buildLayout("Log", data.logLayout);

    // load the old settings (blank graph and logs object have been made by buildLayout)
    for (var i = 0; i < graphs.length; i++) {
        graphs[i].settings = data.graphSettings[i];
    }

    for (var i = 0; i < logViews.length; i++) {
        logViews[i].settings = data.logSettings[i];
    }

    // apply the new settings
    rewriteAllGraphs();
    rewriteAllLogs();
}

function loadData(data) {
    graphData = data.graphData;
    logData = data.logData;

    rewriteAllGraphs();
    rewriteAllLogs();
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
