var cart = {};
var price = {};
var names = {};
var bill = 0;

function loadCartandPrice() {
	//проверяю есть ли в localStorage запись cart
	if (localStorage.getItem('cart')) {
		// если есть - расширфровываю и записываю в переменную cart
		cart = JSON.parse(localStorage.getItem('cart'));
		price = JSON.parse(localStorage.getItem('price'));
		names = JSON.parse(localStorage.getItem('names'));
		showCart();
	}
	else {
		$('.mini-cart').html('Корзина пуста!');
	}
}

function showCart() {
	//вывод корзины
	if (!isEmpty(cart)) {
		$('.mini-cart').html('Корзина пуста!');
		$('#submit_deliver').css({'display':'none'});
	}
	else {
		$('#submit_deliver').css({'display':'inline-block'});
		bill = 0;
		var out = '';
		for (var id in cart) {
			out += `<button id="${id}-del" class="del-goods"></button>`;
			out += ` ${names[id]}`;
			out += `  <button id="${id}-minus" class="minus-goods"></button>  `;
			out += ` ${cart[id]  }`;
			out += `  <button id="${id}-plus" class="plus-goods"></button>  `;
			out += (price[id] * cart[id]).toFixed(1);
			bill += +(price[id] * cart[id]).toFixed(1);
			out += '<br>';
			bill = (bill*10).toFixed(1)/10;
		}
		out += `<h3 id="bill">Итого: ${bill}</h3>`;
		$('.mini-cart').html(out);
		$('.del-goods').on('click', delGoods);
		$('.plus-goods').on('click', plusGoods);
		$('.minus-goods').on('click', minusGoods);
	}
}

function delGoods() {
	//удаляем товар из корзины
	var id = $(this).attr('id');
	id = id.split("-");
	id = id[0]
	delete cart[id];
	delete names[id];
	delete price[id];
	saveCartandPrice();
	showCart();
}

function plusGoods() {
	//добавляет товар в корзине
	var id = $(this).attr('id');
	id = id.split("-");
	id = id[0]
	cart[id]++;
	saveCartandPrice();
	showCart();
}

function minusGoods() {
	//уменьшаем товар в корзине
	var id = $(this).attr('id');
	id = id.split("-");
	id = id[0]
	if (cart[id]==1) {
		delete cart[id];
		delete price[id];
		delete names[id];
	}
	else {
		cart[id]--;
	}
	saveCartandPrice();
	showCart();
}

function saveCartandPrice() {
	//сохраняю корзину в localStorage
	localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
	localStorage.setItem('price', JSON.stringify(price)); //корзину в строку
	localStorage.setItem('names', JSON.stringify(names)); //корзину в строку
}

function isEmpty(object) {
	//проверка корзины на пустоту
	for (var key in object)
		if (object.hasOwnProperty(key)) return true;
	return false;
}

function sendEmail() {
	var ename = $('[name="name"]').val();
	var surname = $('[name="surname"]').val();
	var email = $('[name="mail"]').val();
	var ephone = $('[name="phone"]').val();
	var comment = $('[name="comment"]').val();
	if (ename!=''  && ephone!='') {
		if (isEmpty(cart)) {
			if($('#map').length) {
				var city = $('[name="city"]').val();
				var street = $('[name="street"]').val();
				var house = $('[name="house"]').val();
				var flat = $('[name="flat"]').val();
				var floor = $('[name="floor"]').val();
				var housephone = $('[name="housephone"]').val();
				var address = 'г.' + city + ', ул.' + street + ', д.' + house + ', кв.'
					+ flat + ', этаж.' + floor + ', домофон.' + housephone;
				$.post(
					"php/order.php",
					{
						'surname': surname,
						"ename" : ename,
						"email" : email,
						"ephone" : ephone,
						"comment": comment,
						'address' : address,
						"cart" : cart,
						'bill' : bill,
						'price': price,
						'names' : names,
						function(){
							alert('Данные отправлены!');
							cart = {};
							price = {};
							names = {};
							saveCartandPrice();
						}
					},
				);
			}
			else {
				$.post(
					"php/self_order.php",
					{
						'surname': surname,
						"ename" : ename,
						"email" : email,
						"ephone" : ephone,
						"comment": comment,
						"cart" : cart,
						'bill' : bill,
						'price': price,
						'names' : names,
						function(){
							alert('Данные отправлены!');
							cart = {};
							price = {};
							names = {};
							saveCartandPrice();
						}
					},
				);

			}
		}
		else {
			alert('Корзина пуста');
		}
	}
	else {
		alert('Заполните поля');
	}
	window.location.href = 'index.html';
}



$(document).ready(function () {
	$('.menu_burger').click(function(event){
		$('.menu_burger,.header_menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('form').on('submit',function(event) {
		alert('Сообщение отправлено. Мы ответим вам в ближайшее время.');
		$('.form_text, .form_textarea').val('');
	});
	console.log(cart)
	loadCartandPrice();
	console.log(cart)

});
