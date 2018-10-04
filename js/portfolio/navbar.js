function navControl(menuButton){
	if (document.getElementById('navBar').style.width == "180px") {
		menuButton.classList.toggle("change");
		$("#navBarContent").animate({opacity : 0},400);
		document.getElementById("main").style.marginLeft = "0px";
		document.getElementById("navBar").style.width = "0px";
		document.getElementById('menuButton').style.left = "15px";
	} else {
		menuButton.classList.toggle("change");
		$("#navBarContent").animate({opacity : 1},800);
		document.getElementById("main").style.marginLeft = "180px";
		document.getElementById("navBar").style.width = "180px";
		document.getElementById('menuButton').style.left = "195px";
	}
}