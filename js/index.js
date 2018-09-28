function controlNav() {
	if (document.getElementById("navBar").style.width == "200px") {
		document.getElementById("navBar").style.width = "0";
		document.getElementById("main").style.marginLeft= "0";
		$("#menuButton").animate({"opacity": 0}, 300, function() {
				$(this).html("&#9776").animate({"opacity": 1}, 300);
		});
	} else {
		document.getElementById("navBar").style.width = "200px";
		document.getElementById("main").style.marginLeft = "200px";
		$("#menuButton").animate({"opacity": 0}, 300, function() {
				$(this).html("X").animate({"opacity": 1}, 300);
		});
	}
}