function addValueAxis() {
	// find high axis number
	var axisInputs = $(".value-display");
	var largestId = 0;
	for (var i = 0; i < axisInputs.length; i++) {
		var id = parseInt($(axisInputs[i]).attr("id"));
		console.log(id);
		if (id > largestId) {
			largestId = id;
		}
	}

	// make new inputs
	var $displayNameInput = $("<input name='value-display" + (largestId + 1)
		+ "' class='value-display' id='" + (largestId + 1)
		+ "' type='text' placeholder='Display Name'>");
	var $dataFieldInput = $("<input name='value-data" + (largestId + 1)
		+ "' class='value-data' id='" + (largestId + 1)
		+ "' type='text' placeholder='Data Field'>");

	// add line break followed by the two inputs before the plus button
	$("<br><br>").insertBefore($("a.add-value-axis"));
	$displayNameInput.insertBefore($("a.add-value-axis"));
	$dataFieldInput.insertBefore($("a.add-value-axis"));
}
