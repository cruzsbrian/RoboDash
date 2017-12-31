// filter: an array of subjects
function LogView(scrollView, filter) {
    this.$scrollView = scrollView;
    this.settings = {
        filter: filter,

        // if the user is at the bottom (most recent part) of the log
        keepAtBottom: true
    };

    this.writeAll = function () {
        // clear all the other prints
        this.$scrollView.find("span").remove();
        this.$scrollView.find("br").remove();

        // go through all logs to print
        for (var i = 0; i < logData.length; i++) {
           this.writeLog(logData[i]);
        }

        // go to the top and then back to the bottom to account for the new size
        this.$scrollView.scrollTop(0);
    };

    this.writeLog = function (log) {
        // print it if filter is blank (ie print everything) or if the subject is in the filter
        if (this.settings.filter == 0 || this.settings.filter.indexOf(log.subject) !== -1) {
            var $timestampSpan = $("<span>");
            var $subjectSpan = $("<span>");
            var $messageSpan = $("<span>");

            $timestampSpan.text("[" + log.t + "s]");
            $subjectSpan.text("[" + log.subject + "]");
            $messageSpan.text(log.msg);

            this.$scrollView.find(".timestamp").append($timestampSpan, $("<br>"));
            this.$scrollView.find(".subject").append($subjectSpan, $("<br>"));
            this.$scrollView.find(".message").append($messageSpan, $("<br>"));
        }
    };

    this.scrollToBottom = function () {
        this.$scrollView.scrollTop(this.maxScrollOffset());
    };

    this.maxScrollOffset = function() {
        return this.$scrollView[0].scrollHeight - this.$scrollView[0].clientHeight;
    };
}

var logViews = [];
var subjects = [];
var logData = [];

function addLog(newLogs) {
    logData = logData.concat(newLogs);

    // loop through each new log
    for (var logIndex = 0; logIndex < newLogs.length; logIndex++) {
        var log = newLogs[logIndex];

        // add the subject
        addSubject(log.subject);

        // add the log to all logViews
        for (var i = 0; i < logViews.length; i++) {
            logViews[i].writeLog(log)
        }
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

function rewriteAllLogs() {
    for (var i = 0; i < logViews.length; i++) {
        logViews[i].writeAll();

        // make sure the bottomButton is facing the right way
        var $bottomButton = $(".log-bottom-button[id=" + i + "]");
        if (logViews[i].settings.keepAtBottom) {
            $bottomButton.html("&#9650;");
        } else {
            $bottomButton.html("&#9660;");
        }
    }
}

function clearLogs() {
    logData = [];
    rewriteAllLogs();
}

function makeLogView($panel) {
    // get id (0-indexed) for the graph
    var id = parseInt($panel.attr("id"));

    var $logView = $(document.createElement("div")).addClass("logview");
    $logView.attr("id", "log" + id);

    var $scrollView = $("<div class='scrollView' id='" + id + "'>");
    $logView.append($scrollView);

    $scrollView.append($("<div class='column timestamp'>"));
    $scrollView.append($("<div class='column subject'>"));
    $scrollView.append($("<div class='column message'>"));

    var logView = new LogView($scrollView, []);
    logViews[id] = logView;
    logView.writeAll();

    var $settingsButton = $("<a class='open-settings-button clickable' id='" + id + "'>&#x26ed;</a>");
    $settingsButton.click(function() {
        configLog(id);
    });
    $logView.append($settingsButton);

    // button to switch on/off locking at the bottom
    var $bottomButton = $("<a class='log-bottom-button clickable' id='" + id + "'>&#9650;</a>");
    $bottomButton.click(function() {
        if (logView.settings.keepAtBottom) {
            logView.settings.keepAtBottom = false;
            $bottomButton.html("&#9660;");
        } else {
            logView.settings.keepAtBottom = true;
            $bottomButton.html("&#9650;");
        }
    });
    $logView.append($bottomButton);

    // keep buttons at the bottom
    $logView.scroll(function() {
        $settingsButton.css("bottom", -$logView.scrollTop());
        $bottomButton.css("bottom", -$logView.scrollTop());
    });

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
        e.preventDefault();
        saveLogSettings(id);
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
        if (l.settings.filter.indexOf(filterName) !== -1) {
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
    logViews[id].settings.filter = filter;
    logViews[id].writeAll();

    // hide settings dialog
    hideSettings($(".logSettings"));

    // clear the form submit handler so another log can use it
    $("#logSettingsForm").unbind("submit");
}

// check the scroll position of the logs periodically
var logScrollInterval = setInterval(function() {
    for (var i = 0; i < logViews.length; i++) {
        if (logViews[i].settings.keepAtBottom) {
            logViews[i].scrollToBottom();
        }
    }
}, 50);
