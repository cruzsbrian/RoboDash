// filter: an array of subjects
function LogView(element, filter) {
    this.$element = element;
    this.filter = filter;

    this.writeAll = function () {
        // clear all the other prints
        this.$element.find("span").remove();
        this.$element.find("br").remove();

        // go through all logs to print
        for (var i = 0; i < logData.length; i++) {
           this.writeLog(logData[i]);
        }
    };

    this.writeLog = function (log) {
        // if filter is blank (ie print everything) or if the subject is in the filter
        if (this.filter == 0 || this.filter.indexOf(log.subject) !== -1) {
            var $timestampSpan = $("<span>");
            var $subjectSpan = $("<span>");
            var $messageSpan = $("<span>");

            $timestampSpan.text("[" + log.t + "s]");
            $subjectSpan.text("[" + log.subject + "]");
            $messageSpan.text(log.msg);

            this.$element.find(".timestamp").append($timestampSpan, $("<br>"));
            this.$element.find(".subject").append($subjectSpan, $("<br>"));
            this.$element.find(".message").append($messageSpan, $("<br>"));
        }
    };
}

var logViews = [];
var subjects = [];
var logData = [];

function addLog(log) {
    logData.push(log);
    addSubject(log.subject);

    for (var i = 0; i < logViews.length; i++) {
        logViews[i].writeLog(log)
    }
}

function addSubject(s) {
    // add subject to list
    if (subjects.indexOf(s) === -1) {
        subjects.push(s);

        // add subject checkbox
        var $logFilterGroup = $("#log-filter-group");
        var $checkbox = $("<input type='checkbox' id='" + s + "' name='" + s + "'>");
        var $checkboxLabel = $("<label for='" + s + "'>" + s + "</label>");

        $logFilterGroup.append($checkbox);
        $logFilterGroup.append($checkboxLabel);
        $logFilterGroup.append("<br>");

        // remove the "no logs" message
        $logFilterGroup.find("p").remove();

        // make sure the list doesn't get too tall
        if ($logFilterGroup[0].scrollHeight > 350) {
            $logFilterGroup.css("overflow-y", "scroll");
        }
    }
}

function makeLogView($panel) {
    // get id (0-indexed) for the graph
    var id = parseInt($panel.attr("id"));

    var $logView = $(document.createElement("div")).addClass("logview");
    $logView.attr("id", "log" + id);
    $logView.append($("<div class='column timestamp'>"));
    $logView.append($("<div class='column subject'>"));
    $logView.append($("<div class='column message'>"));

    var logView = new LogView($logView, []);
    logViews[id] = logView;
    logView.writeAll();

    var $settingsButton = $("<a class='open-settings-button clickable' id='" + id + "'>&#x26ed;</a>");
    $settingsButton.click(function() {
        configLog(id);
    });
    $logView.append($settingsButton);

    $panel.append($logView);
}

function configLog(id) {
    // load settings for that log
    loadLogSettings(id);

    showSettings($(".logSettings"));

    // make sure the list doesn't get too tall
    var $logFilterGroup = $("#log-filter-group");
    if ($logFilterGroup[0].scrollHeight > 350) {
        $logFilterGroup.css("overflow-y", "scroll");
    }

    // have the form save the right log when submitted
    $("#logSettingsForm").submit(function(e) {
        saveLogSettings(id);
        e.preventDefault();
    });
}

function loadLogSettings(id) {
    // get log for the id
    var l = logViews[id];

    // go through each box
    var allBoxes = $("#logSettingsForm input[type=checkbox]");
    for (var i = 0; i < allBoxes.length; i++) {
        box = allBoxes[i];

        // check if it's in the filter
        var filterName = box.id;
        if (l.filter.indexOf(filterName) !== -1) {
            box.checked = true;
        } else {
            box.checked = false;
        }
    }
}

function saveLogSettings(id) {
    var filter = [];

    // go through each box
    var allBoxes = $("#logSettingsForm input[type=checkbox]");
    for (var i = 0; i < allBoxes.length; i++) {
        box = allBoxes[i];

        // add to the filter if it's checked
        if (box.checked) {
            filter[filter.length] = box.id;
        }
    }

    // update the logView and refresh stuff
    logViews[id].filter = filter;
    logViews[id].writeAll();

    // hide settings dialog
    hideSettings($(".logSettings"));

    // clear the form submit handler so another log can use it
    $("#logSettingsForm").unbind("submit");
}
