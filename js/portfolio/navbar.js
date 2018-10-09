function navControl(){
	if (document.getElementById('navBar').style.width == '180px') {
		$('#menuButton').animate({'opacity': 0}, 300, function() {$(this).html('&#9776').animate({'opacity': 1}, 300);});
		$('#navBarContainer').animate({opacity : 0},400);
		//document.getElementById('main').style.marginLeft = '0px';
		document.getElementById('main').style.opacity = '1';
		document.getElementById('navBar').style.width = '0px';
		document.getElementById('menuButtonContainer').style.left = '15px';
	} else {
		$('#menuButton').animate({'opacity': 0}, 400, function() {$(this).html('X').animate({'opacity': 1}, 400);});
		$('#navBarContainer').animate({opacity : 1},800);
		//document.getElementById('main').style.marginLeft = '180px';
		document.getElementById('main').style.opacity = '0.2';
		document.getElementById('navBar').style.width = '180px';
		document.getElementById('menuButtonContainer').style.left = '195px';
	}
}

document.addEventListener('touchstart', function addtouchclass(e){ // first time user touches the screen
    document.documentElement.classList.add('can-touch') // add 'can-touch' class to document root using classList API
    document.removeEventListener('touchstart', addtouchclass, false) // de-register touchstart event
}, false)


