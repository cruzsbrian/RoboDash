var removing = false;

function addPanel() {
    if (currentTab === "Constants") {
        addConstantToForm();
    } else {
        // find largest leaf panel
        var panels = $("#" + currentTab + " .panel.panel-leaf");
        var largestPanel = panels[0];
        var largestArea = largestPanel.clientWidth * largestPanel.clientHeight;
        for (var i = 1; i < panels.length; i++) {
            p = panels[i];
            a = p.clientWidth * p.clientHeight;
            if (a  + 1000 >= largestArea) {	// +1000 to have a bias for later panels (makes it prettier)
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

        // determine if making a horizontal or vertical branch
        var widthBias = 1;
        var heightBias = 1;
        if (currentTab === "Graphs") { // prefer wide graphs
            widthBias = 1;
            heightBias = 2;
        } else if (currentTab === "Log") { // prefer tall logs
            widthBias = 1.5;
            heightBias = 1;
        }

        var branchType;
        if (largestPanel.clientWidth * widthBias >= largestPanel.clientHeight * heightBias) {
            branchType = 'h';
        } else {
            branchType = 'v';
        }

        addPanelFromInfo(currentTab, branchType, parseInt(largestPanel.id), largestId + 1);
    }
}

function addPanelFromInfo(tab, branchType, branchId, newId) {
    // record-keeping for saving/loading
    addPanelToLayout(currentTab, branchType, branchId, newId);

    // create a branch panel to replace it containing the old panel and the new one
    // make a new panel, get the old panel, and make a branch panel to contain both
    var $newpanel = $(document.createElement("div")).addClass("panel panel-leaf").attr("id", newId);
    var $oldpanel = $($("#" + tab + " .panel[id=" + branchId + "]")[0]); // do the array thing so that we only get one
    var $branchpanel = $(document.createElement("div")).addClass("panel");

    if (branchType == 'h') {
        $branchpanel.addClass("panel-branch-horizontal");
    } else {
        $branchpanel.addClass("panel-branch-vertical");
    }

    if (tab == "Graphs") {
        makeGraphView($newpanel);
    } else if (tab == "Log") {
        makeLogView($newpanel);
    }

    $branchpanel.insertAfter($oldpanel);
    $oldpanel.detach().appendTo($branchpanel);
    $newpanel.appendTo($branchpanel);
}

function removePanel() {
    if (!removing) {
        removing = true;

        // show the delete buttons for constants
        $(".delete-constant").show();

        // (for logs and graphs) when a panel is moused-over
        $(".panel.panel-leaf").mouseenter(function() {
            $panel = $(this);

            // Create covering element with same id as panel
            $cover = $(document.createElement("div")).addClass("remove-cover").attr("id", this.id);

            // Give it the same position, but with 1px added in every direction to take care of borders
            // TODO: this is really ugly, but CSS is evil
            $cover.css({
                top: this.offsetTop - 1,
                left: this.offsetLeft - 1,
                width: this.offsetWidth + 2,
                height: this.offsetHeight + 2,
            });

            // Get rid of the cover when mouse leaves the panel
            $cover.mouseleave(function () {
                $cover.remove();
            });

            // When clicked, remove cover, move the sibling panel up a level, remove the panel and branch panel
            $cover.click(function () {
                $cover.remove();

                // make sure there is at least one panel left
                if ($("#" + currentTab + " .panel.panel-leaf").length > 1) {
                    $branchpanel = $panel.parent();
                    $keeppanel = $panel.siblings();

                    $keeppanel.insertAfter($branchpanel);
                    $panel.remove();
                    $branchpanel.remove();

                    if (currentTab == "Graphs") {
                        resizeGraphs();
                    }
                }
            });

            // Put the cover in the place
            $cover.appendTo($(this.parentElement));
            $cover.show();
        });

        // Add class to show pointer cursor
        $(".panel.panel-leaf").addClass("panel-removable");

        // Make the remove button red
        $("#removepanel").addClass("active");
    } else {
        removing = false;
        $(".remove-cover").remove();
        $(".panel.panel-leaf").removeClass("panel-removable");
        $(".panel.panel-leaf").unbind("mouseenter");
        $("#removepanel").removeClass("active");
        $(".delete-constant").hide();
    }
}
