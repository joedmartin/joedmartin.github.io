$(window).scroll(function()  {
	var wScroll = $(window).scrollTop();
	$('#mainHeader').css('background-position', 'center ' + (wScroll*0.3 + 50) + '%')
})