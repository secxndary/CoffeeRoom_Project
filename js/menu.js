var cart = new Object(); // корзина
// console.log(cart)

var price = new Object();
// console.log(price)

var names = {};
// console.log(names)

function addToCart() {
	//добавляем товар в корзину
	var id = $(this).attr('id');
	// console.log(cart)
	// console.log(names)
	// console.log(price)

	console.log(id)
	var buf_name = $('#' + id + '_name').text();
	// console.log(buf_name);
	var buf_price = ($('#' + id+'_price').text());
	// console.log(buf_price);
	if (cart[id]==undefined) {
		cart[id] = 1; //если в корзине нет товара - делаем равным 1
		// console.log(id)
		price[id] = buf_price;
		// console.log(price[id]);
		names[id] = buf_name;
		// console.log(name[id]);
		// console.log(cart)
		// console.log(name)
		// console.log(price)
	}
	else {
		cart[id]++; //если такой товар есть - увеличиваю на единицу
	}
	showMiniCart();
	saveCartandPrice();
}
function saveCartandPrice() {
	//сохраняю корзину в localStorage
	localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
	localStorage.setItem('price', JSON.stringify(price)); //корзину в строку
	localStorage.setItem('names', JSON.stringify(names)); //корзину в строку
}

function loadCartandPrice() {
	//проверяю есть ли в localStorage запись cart
	if (localStorage.getItem('cart') && localStorage.getItem('price') && localStorage.getItem('names')) {
		// если есть - расширфровываю и записываю в переменную cart
		cart = JSON.parse(localStorage.getItem('cart'));
		price = JSON.parse(localStorage.getItem('price'));
		names = JSON.parse(localStorage.getItem('names'));
		showMiniCart();
	}
}

function isEmpty(object) {
	//проверка корзины на пустоту
	for (var key in object)
		if (object.hasOwnProperty(key)) return true;
	return false;
}

function showMiniCart() {
	if (!isEmpty(cart)) {
		$('.mini-cart').html('Корзина пуста!');
	}
	else {
			var bill = 0;
			var out = '';
			for (var id in cart) {
				console.log(id)
				out += `<button id="${id}-del" class="del-goods"></button>`;
				out += ` ${names[id]} `;
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
	showMiniCart();
}

function plusGoods() {
	//добавляет товар в корзине
	var id = $(this).attr('id');
	id = id.split("-");
	id = id[0]
	cart[id]++;
	saveCartandPrice();
	showMiniCart();
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
	showMiniCart();
}

$(document).ready(function () {
	$('.menu_burger').click(function(event){
		$('.menu_burger,.header_menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.add-to-cart').on('click', addToCart);
	loadCartandPrice();
});

