var currentTab = "";

function openTab(tabName) {
	currentTab = tabName;

	$(".tabcontent").hide();
	$(".toolbar-button").removeClass("active");
	$("#" + currentTab).css("display", "flex");
	$("#" + currentTab + "tab").addClass("active");
}

function showDropdown() {
	console.log("opening dropdown");
	$(".dropdown").addClass("active");
	
	$(document).ready(function() {
		$("body").click(function() {
			$(".dropdown").removeClass("active");
			$("body").unbind("click");
		});
	});
}
