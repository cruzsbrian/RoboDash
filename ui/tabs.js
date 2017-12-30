var currentTab = "";

function openTab(tabName) {
    currentTab = tabName;

    $(".tabcontent").hide();
    $(".toolbar-button").removeClass("active");
    $("#" + currentTab).css("display", "flex");
    $("#" + currentTab + "tab").addClass("active");
}

function toggleDropdown() {
    if ($(".dropdown").hasClass("active")) {
        $(".dropdown").removeClass("active");
    } else {
        $(".dropdown").addClass("active");
    }
}
