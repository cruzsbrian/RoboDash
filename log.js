function makeLogView($panel) {
	var $logView = $(document.createElement("div")).addClass("logview");
	$panel.append($logView);
}

function addLog(data) {
	var $timestampSpan = $(document.createElement("span")).addClass("timestamp");
	var $senderSpan = $(document.createElement("span")).addClass("sender");
	var $messageSpan = $(document.createElement("span")).addClass("message");

	$timestampSpan.text("[" + data.t + "]");
	$senderSpan.text("[" + data.sender + "]");
	$messageSpan.text(data.msg);

	$(".logview").append($timestampSpan, $senderSpan, $messageSpan, "<br>");
}
