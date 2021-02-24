$(window).scroll(function()  {
	var wScroll = $(window).scrollTop();
	$('#headerSection').css('background-position', 'center ' + (wScroll*0.22 + 50) + '%');
})