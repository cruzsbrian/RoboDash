function makeLogView($panel) {
	var $logView = $(document.createElement("div")).addClass("logview");
	$panel.append($logView);
}

function addLog(data) {
	var $timestampSpan = $(document.createElement("span")).addClass("timestamp");
	var $subjectSpan = $(document.createElement("span")).addClass("subject");
	var $messageSpan = $(document.createElement("span")).addClass("message");

	$timestampSpan.text("[" + data.t + "s]");
	$subjectSpan.text("[" + data.subject + "]");
	$messageSpan.text(data.msg);

	$(".logview").append($timestampSpan, $subjectSpan, $messageSpan, "<br>");
}
