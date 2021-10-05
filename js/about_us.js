$(document).ready(function () {
	$('.menu_burger').click(function(event){
		$('.menu_burger,.header_menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.slider').slick({
		dots: true,
		speed: 700,
		autoplay: true,
		autoplaySpeed: 2300,
		waitForAnimate: false,
	});
});