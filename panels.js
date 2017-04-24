var removing = false;

function addPanel() {
	// find largest leaf panel
	var panels = $("#" + currentTab + " .panel.panel-leaf");
	var largestPanel = panels[0];
	var largestArea = panels[0].clientWidth * panels[0].clientHeight;
	for (var i = 1; i < panels.length; i++) {
		p = panels[i];
		a = p.clientWidth * p.clientHeight;
		if (a  + 1000 >= largestArea) {	// if they're the same I want the last one for aesthetic reasons
			largestPanel = p;
			largestArea = a;
		}
	}

	// find largest panel id
	largestId = 0;
	for (var i = 0; i < panels.length; i++) {
		id = parseInt($(panels[i]).attr("id"));
		if (id > largestId) {
			largestId = id;
		}
	}

	// create a branch panel to replace it containing the old panel and the new one
	var $branchpanel = $(document.createElement("div")).addClass("panel");
	var $oldpanel = $(largestPanel);
	var $newpanel = $(document.createElement("div")).addClass("panel panel-leaf").attr("id", largestId + 1);

	if (largestPanel.clientWidth >= largestPanel.clientHeight * 1.25) { // *1.25 for better aspect ratio
		$branchpanel.addClass("panel-branch-horizontal");
	} else {
		$branchpanel.addClass("panel-branch-vertical");
	}

	$branchpanel.insertAfter($oldpanel);
	$oldpanel.detach().appendTo($branchpanel);
	$newpanel.appendTo($branchpanel);
}

function removePanel() {
	if (!removing) {
		removing = true;
		/*$(".panel.panel-leaf").mouseenter(function() {
			// Create covering element directly over panel
			$cover = $(document.createElement("div")).addClass("remove-cover").attr("id", this.id);
			$cover.css({
				top: this.offsetTop,
				left: this.offsetLeft,
				width: this.offsetWidth - 1,
				height: this.offsetHeight - 1,
			});
			$cover.mouseleave(function () {
				$cover.fadeOut(function() { $(".remove-cover#" + this.id).remove(); });
			});

			$cover.appendTo($(this.parentElement));
			$cover.fadeIn();
		});*/

		$(".panel.panel-leaf").addClass("panel-removable");

		$(".panel.panel-leaf").click(function() {
			$branchpanel = $(this).parent();
			$keeppanel = $(this).siblings();

			$keeppanel.insertAfter($branchpanel);
			$(this).remove();
			$branchpanel.remove();
		});

		$("#removepanel").addClass("active");
	} else {
		removing = false;
		$(".remove-cover").remove();
		$(".panel.panel-leaf").removeClass("panel-removable");
		$(".panel.panel-leaf").unbind("mouseenter");
		$("#removepanel").removeClass("active");
	}
}
