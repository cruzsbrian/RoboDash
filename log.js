var subjects = [];

function makeLogView($panel) {
	var $logView = $(document.createElement("div")).addClass("logview");
	$logView.append($("<div class='column timestamp'>"));
	$logView.append($("<div class='column subject'>"));
	$logView.append($("<div class='column message'>"));
	$panel.append($logView);
}

function addLog(data) {
	var $timestampSpan = $("<span>");
	var $subjectSpan = $("<span>");
	var $messageSpan = $("<span>");

	$timestampSpan.text("[" + data.t + "s]");
	$subjectSpan.text("[" + data.subject + "]");
	$messageSpan.text(data.msg);

	$(".logview .timestamp").append($timestampSpan, $("<br>"));
	$(".logview .subject").append($subjectSpan, $("<br>"));
	$(".logview .message").append($messageSpan, $("<br>"));

	// check if subject is in list and add it if it isn't
	if (subjects.indexOf(data.subject) < 0) {
		subjects.push(data.subject);
	}
}
