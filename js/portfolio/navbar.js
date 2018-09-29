function navControl(){
	if (document.getElementById('navBar').style.width == "40px") {
		document.getElementById("main").style.marginLeft = "180px";
		document.getElementById("navBar").style.width = "180px";
		document.getElementById("menuButtonTable").style.paddingRight = "10px";
		$("#menuButton").animate({"opacity": 0}, 300, function() {$(this).html("X").animate({"opacity": 1}, 300);});
		$("#home").animate({"opacity": 0}, 300, function() {$(this).html("<a href=\"#\" class=\"navBarLink\">Home</a>").animate({"opacity": 1}, 300);});
		$("#about").animate({"opacity": 0}, 300, function() {$(this).html("<a href=\"#\" class=\"navBarLink\">About</a>").animate({"opacity": 1}, 300);});
		$("#work").animate({"opacity": 0}, 300, function() {$(this).html("<a href=\"#\" class=\"navBarLink\">Work</a>").animate({"opacity": 1}, 300);});
		$("#contact").animate({"opacity": 0}, 300, function() {$(this).html("<a href=\"#\" class=\"navBarLink\">Contact</a>").animate({"opacity": 1}, 300);});
		$("#firstName").animate({"opacity": 0}, 300, function() {$(this).html("JOSEPH").animate({"opacity": 1}, 300);});
		$("#lastName").animate({"opacity": 0}, 300, function() {$(this).html("MARTIN").animate({"opacity": 1}, 300);});
	} else {
		document.getElementById("main").style.marginLeft = "40px";
		document.getElementById("navBar").style.width = "40px";
		document.getElementById("menuButtonTable").style.paddingRight = "4px";
		$("#menuButton").animate({"opacity": 0}, 300, function() {$(this).html("&#9776").animate({"opacity": 1}, 300);});
		$("#home").animate({"opacity": 0}, 300, function() {$(this).html("<img class=\"navBarIcon\" src=\"images\/home.png\" width=\"30\" height=\"30\">").animate({"opacity": 1}, 300);});
		$("#about").animate({"opacity": 0}, 300, function() {$(this).html("<img class=\"navBarIcon\" src=\"images\/about.png\" width=\"30\" height=\"30\">").animate({"opacity": 1}, 300);});
		$("#work").animate({"opacity": 0}, 300, function() {$(this).html("<img class=\"navBarIcon\" src=\"images\/work.png\" width=\"30\" height=\"30\">").animate({"opacity": 1}, 300);});
		$("#contact").animate({"opacity": 0}, 300, function() {$(this).html("<img class=\"navBarIcon\" src=\"images\/contact.png\" width=\"30\" height=\"30\">").animate({"opacity": 1}, 300);});
		$("#firstName").animate({"opacity": 0}, 300, function() {$(this).html("J").animate({"opacity": 1}, 300);});
		$("#lastName").animate({"opacity": 0}, 300, function() {$(this).html("M").animate({"opacity": 1}, 300);});
	}
}