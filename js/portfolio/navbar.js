function navControl(x){
	if (document.getElementById('navBar').style.width == "180px") {
		x.classList.toggle("change");
		$("#home, #about, #work, #contact, #firstName, #lastName").animate({opacity: 0}, 400);
		document.getElementById("main").style.marginLeft = "0px";
		document.getElementById("navBar").style.width = "0px";
		document.getElementById('menuButton').style.left = "15px";
	} else {
		x.classList.toggle("change");
		$("#home, #about, #work, #contact, #firstName, #lastName").animate({opacity: 1}, 800);
		document.getElementById("main").style.marginLeft = "180px";
		document.getElementById("navBar").style.width = "180px";
		document.getElementById('menuButton').style.left = "195px";
	}
}