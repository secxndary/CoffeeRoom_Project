$(document).ready(function () {
	$('.menu_burger').click(function(event){
		$('.menu_burger,.header_menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('form').on('submit',function(event) {
		alert('Сообщение отправлено. Мы ответим вам в ближайшее время.');
		$('.form_text, .form_textarea').val('');
	});
});