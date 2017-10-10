var reader = new FileReader();

function showLoadLayout() {
    $(".dropdown-content").hide();

    $(".loadSettings #title").text("Load Layout");

    $("#loadSettingsForm").submit(function(e) {
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

        e.preventDefault();
    });

    showSettings($(".loadSettings"));
}

function showSaveLayout() {
    $(".dropdown-content").hide();

    $(".saveSettings #title").text("Save Layout");

    $("#saveSettingsForm").unbind("submit");
    $("#saveSettingsForm").submit(function(e) {
        var form = document.forms["saveSettings"];
        var filename = form["savefile"].value;

        download(JSON.stringify(generateLayout()), filename);

        hideSettings($(".saveSettings"));

        e.preventDefault();
    });

    showSettings($(".saveSettings"));
}

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

    // make sure the correct tab is showing (this gets messed up b/c of css attributes being stored)
    openTab(currentTab);
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
