// storing layout information for saving layouts
function Panel(id, children) {
    this.id = id;
    this.children = children || [];
    this.branchType = null;
}

var graphLayout = new Panel(0);

var logLayout = new Panel(0);

function addPanelToLayout(tab, branchType, branchId, newId) {
    // make sure to modify the right tab
    if (tab === "Graphs") {
        var root = graphLayout;
    } else if (tab === "Log") {
        var root = logLayout;
    } else {
        return;
    }

    var branchPanel = findNode(root, branchId);

    branchPanel.branchType = branchType;

    // only leaf panels have ids
    // makes more sense because they are shared for graph/log ids
    branchPanel.id = null;

    branchPanel.children.push(new Panel(branchId));
    branchPanel.children.push(new Panel(newId));
}

function buildLayout(tab, layout) {
    if (tab === "Graphs") {
        graphLayout = layout;
    } else if (tab === "Log") {
        logLayout = layout;
    }

    $("#" + tab).children().remove();
    buildPanel(tab, layout, $("#" + tab));
}

function buildPanel(tab, panel, $parentElement) {
    var $newpanel = $("<div class='panel'>");
    $parentElement.append($newpanel);

    if (panel.children.length > 0) {
        if (panel.branchType === "h") {
            $newpanel.addClass("panel-branch-horizontal");
        } else if (panel.branchType === "v") {
            $newpanel.addClass("panel-branch-vertical");
        }

        for (var i = 0; i < panel.children.length; i++) {
            buildPanel(tab, panel.children[i], $newpanel);
        }
    } else {
        $newpanel.addClass("panel-leaf").attr("id", panel.id);

        if (tab === "Graphs") {
            makeGraphView($newpanel);
        } else if (tab === "Log") {
            makeLogView($newpanel);
        }
    }
}

function findNode(tree, id) {
    var stack = [tree];

    while (stack.length > 0) {
        var node = stack.pop();
        if (node.id == id) {
            return node;
        } else if (node.children.length > 0) {
            for (var i = 0; i < node.children.length; i++) {
                stack.push(node.children[i]);
            }
        }
    }
}
