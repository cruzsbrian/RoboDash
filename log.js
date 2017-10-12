// filter: an array of subjects
function LogView(element, filter) {
    this.$element = element;
    this.filter = filter;

    this.writeAll = function () {
        for (var i = 0; i < logData.length; i++) {
           this.writeLog(logData[i]);
        }
    };

    this.writeLog = function (log) {
        if (this.filter !== [] && this.filter.indexOf(log.subject) !== -1) {
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

function makeLogView($panel) {
    var $logView = $(document.createElement("div")).addClass("logview");
    $logView.append($("<div class='column timestamp'>"));
    $logView.append($("<div class='column subject'>"));
    $logView.append($("<div class='column message'>"));

    var logView = new LogView($logView, ["elevator:motorvoltage"]);
    logViews.push(logView);
    logView.writeAll();

    $panel.append($logView);
}

function addLog(log) {
    logData.push(log);
    addSubject(log.subject);

    for (var i = 0; i < logViews.length; i++) {
        logViews[i].writeLog(log)
    }
}

function addSubject(s) {
    if (subjects.indexOf(s) === -1) {
        subjects.push(s);
    }
}
