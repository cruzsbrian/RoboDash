function addPanel(tabName) {
	// find largest leaf panel
	var panels = $("#" + tabName + " .panel .panel-leaf");
	var largestPanel = panels[0];
	var largestArea = panels[0].innerWidth * panels[0].innerHeight;
	for (var i = 1; i < panels.length; i++) {
		p = panels[i];
		a = p.innerWidth * p.innerHeight;
		if (a >= largestArea) {	// if they're the same I want the last one for aesthetic reasons
			largestPanel = p;
			largestArea = a;
		}
	}
	
	// create a branch panel to replace it containing the old panel and the new one
	var $parent = $(largestPanel.parentElement);
	var $branchpanel = $(document.createElement("div"));
	var $oldpanel = $(largestPanel);
	var $newpanel = $(document.createElement("div"));
	
	if (largestPanel.innerWidth >= largestPanel.innerHeight) {
		
	