function navControl(x){
	if (document.getElementById('navBar').style.width == "0px") {
		x.classList.toggle("change");
		document.getElementById("main").style.marginLeft = "180px";
		document.getElementById("navBar").style.width = "180px";
		document.getElementById('menuButton').style.left = "195px";
		$("#home, #about, #work, #contact, #firstName, #lastName").fadeTo(800,1);
	} else {
		x.classList.toggle("change");
		$("#home, #about, #work, #contact, #firstName, #lastName").fadeTo(400,0.1);
		document.getElementById("main").style.marginLeft = "0px";
		document.getElementById("navBar").style.width = "0px";
		document.getElementById('menuButton').style.left = "15px";
	}
}