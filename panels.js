function addPanel() {
	// find largest leaf panel
	var panels = $("#" + currentTab + " .panel.panel-leaf");
	var largestPanel = panels[0];
	var largestArea = panels[0].clientWidth * panels[0].clientHeight;
	for (var i = 1; i < panels.length; i++) {
		p = panels[i];
		a = p.clientWidth * p.clientHeight;
		if (a >= largestArea) {	// if they're the same I want the last one for aesthetic reasons
			largestPanel = p;
			largestArea = a;
		}
	}
	console.log(largestPanel);

	// create a branch panel to replace it containing the old panel and the new one
	var $parent = $(largestPanel.parentElement);
	var $branchpanel = $(document.createElement("div")).addClass("panel");
	var $oldpanel = $(largestPanel);
	var $newpanel = $(document.createElement("div")).addClass("panel panel-leaf");

	$newpanel.text("New Panel");

	if (largestPanel.clientWidth >= largestPanel.clientHeight) {
		$branchpanel.addClass("panel-branch-horizontal");
	} else {
		$branchpanel.addClass("panel-branch-vertical");
	}

	$oldpanel.detach().appendTo($branchpanel);
	$newpanel.appendTo($branchpanel);

	$branchpanel.appendTo($parent);
}

