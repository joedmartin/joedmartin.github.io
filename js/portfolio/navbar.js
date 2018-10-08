function navControl(){
	if (document.getElementById('navBar').style.width == "180px") {
		$("#menuButton").animate({"opacity": 0}, 300, function() {$(this).html("&#9776").animate({"opacity": 1}, 300);});
		$("#navBarTable").animate({opacity : 0},300);
		$("#header").animate({opacity : 1},300);
		document.getElementById("navBar").style.width = "0px";
		document.getElementById('menuButtonContainer').style.left = "15px";
	} else {
		$("#menuButton").animate({"opacity": 0}, 300, function() {$(this).html("X").animate({"opacity": 1}, 300);});
		$("#navBarTable").animate({opacity : 1},800);
		$("#header").animate({opacity : 0.2},300);
		document.getElementById("navBar").style.width = "180px";
		document.getElementById('menuButtonContainer').style.left = "195px";
	}
}

document.addEventListener('touchstart', function addtouchclass(e){
    document.documentElement.classList.add('can-touch')
    document.removeEventListener('touchstart', addtouchclass, false)
}, false)


