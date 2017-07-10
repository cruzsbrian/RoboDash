function showSettings($settings) {
	$(".shade").show();
	$(".shade").css("opacity", "0.25");
	$settings.show();

	$(".shade").click(function() {
		hideSettings($settings);
	});
}

function hideSettings($settings) {
	$settings.hide();
	$(".shade").css("opacity", "0.25");
	$(".shade").hide();
}
