function makeLogView($panel) {
	var $logView = $(document.createElement("div")).addClass("logview");
	$panel.append($logView);
}

function addLog(data) {
	var $timestampSpan = $(document.createElement("span")).addClass("timestamp");
	var $senderSpan = $(document.createElement("span")).addClass("sender");
	var $messageSpan = $(document.createElement("span")).addClass("message");

	$timestampSpan.text("[" + data.time + "]");
	$senderSpan.text("[" + data.sender + "]");
	$messageSpan.text(data.message);

	$(".logview").append($timestampSpan, $senderSpan, $messageSpan, "<br>");
}
