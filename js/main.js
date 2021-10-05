$(document).ready(function () {
	$('.menu_burger').click(function(event){
		$('.menu_burger,.header_menu').toggleClass('active'); //добавление или удаление класса 
		$('body').toggleClass('lock');
	});
	$('.btn2').click(function(event) {
		$('.menu, .btn').removeClass('active');
		$('.menu2, .btn2, .div_menu').addClass('active');
	});
	$('.btn1').click(function(event) {
		$('.menu, .btn, .div_menu').removeClass('active');
		$('.menu1, .btn1').addClass('active');
	});
	$('form').on('submit',function(event) {
		alert('Данные записаны. Оператор свяжется с вами для уточнения!');
		$('.form').val('');
	});
	$('.button, .button_more').click(function(event) {
		window.location = "menu.html";
	});
});

const itemsAnimate = document.querySelectorAll('.item_animate'); //получаем элементы страницы по селектору 

if(itemsAnimate.length > 0){
	window.addEventListener('scroll', animScroll);
	function animScroll(){
		for (let i = 0; i < itemsAnimate.length; i++) {
			const itemAnimate = itemsAnimate[i];
			const itemAnimateHeight = itemAnimate.offsetHeight; //получаем высоту элемента
			const itemAnimateOffset = offset(itemAnimate).top; //высота от верха
			const animStart = 5;

			let itemAnimatePoint = window.innerHeight - itemAnimateHeight / animStart; //точка старта анимации

			if((pageYOffset > itemAnimateOffset - itemAnimatePoint) && pageYOffset < (itemAnimateOffset + itemAnimateHeight)){
				itemAnimate.classList.add('active');
			} 
			else{ 
				if(!itemAnimate.classList.contains('no_animate')){
					itemAnimate.classList.remove('active');
				}
			}
		}
	}

	function offset(el) { //высота от верха страницы до объекта
    var rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop }
	}
	setTimeout(() => { //задержка анимации
		animScroll();
	}, 300);	
}
