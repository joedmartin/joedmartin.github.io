function navControl(menuButton){
	if (document.getElementById('navBar').style.width == "14%") {
		menuButton.classList.toggle("change");
		$("#navBarContent").animate({opacity : 0},400);
		document.getElementById("main").style.marginLeft = "0%";
		document.getElementById("navBar").style.width = "0%";
		document.getElementById('menuButton').style.left = "2%";
	} else {
		menuButton.classList.toggle("change");
		$("#navBarContent").animate({opacity : 1},800);
		document.getElementById("main").style.marginLeft = "14%";
		document.getElementById("navBar").style.width = "14%";
		document.getElementById('menuButton').style.left = "16%";
	}
}