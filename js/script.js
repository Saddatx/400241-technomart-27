//---------
// 1. IE FIX
//---------

// Устанавливаем паттерны для определения движка IE.
var pattern1 = /trident/gi,
		pattern2 = /msie/gi;

// Определяем браузер IE. Если истина - запускаем скрипт "FixMapPlace".
if (pattern1.test(navigator.userAgent) || pattern2.test(navigator.userAgent)) {
 	FixMapPlace();
}

function FixMapPlace() {
	var modalMapWindow = document.querySelector('.modal-map.size-content');
	modalMapWindow.style.right = 'calc(50% - 470px)';
}

//---------
// 2. MODAL WINDOWS
//---------

// Проверка существования окна карты
try {
	var modalMap = document.querySelector('#modal_map');

	if (!modalMap) {
		throw new ReferenceError('Отсутствует модальное окно карты');
	} 

	ModalMap();
} catch (err) {
	console.log(err.message)
}

// Проверка существования окна обратной связи
try {
	var modalFeedback = document.querySelector('#modal_feedback');

	if (!modalFeedback) {
		throw	new ReferenceError('Отсутствует модальное окно обратной связи');
	}
	
	var userName = document.querySelector('#modal_feedback [name=user-name]'),
			userEmail = document.querySelector('#modal_feedback [name=user-email]'),
			userText = document.querySelector('#modal_feedback [name=user-text]');

	var btn_feedbackOpen = document.querySelector('#modal-feedback_open'),
			btn_feedbackClose = document.querySelector('#modal-feedback_close');

	ModalFeedback();
	SaveUserData();
	ObservingFeedback();
} catch (err) {
	console.log(err.message);
}

// Проверка существования карточек товара
try {
	var productArticle = document.querySelector('.product-article');

	if (!productArticle) {
		throw new ReferenceError('Отсутствуют карточки товара');
	}

	ModalBasket();
	Counting();
} catch (err) {
	console.log(err.message);
}

// Открытие и закрытие окна интерактивной карты
function ModalMap() {
	var btn_mapOpen = document.querySelector('#modal-map_open'),
			btn_mapClose = document.querySelector('#modal-map_close');

	btn_mapOpen.addEventListener('click', OpenModal);

	function OpenModal(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		modalMap.classList.remove('_vis-off');
		modalMap.classList.remove('_animation-close');
		modalMap.classList.add('_animation-open');
		btn_mapClose.focus();
	}

	btn_mapClose.addEventListener('mousedown', CloseModal);
	modalMap.addEventListener('mousedown', CloseModal);

	function CloseModal(evt) {
		evt.stopPropagation();
		if (evt.target.id === 'modal_map' || evt.target.id === 'modal-map_close') {
			setTimeout(function () { modalMap.classList.add('_vis-off'); }, 250);
			modalMap.classList.remove('_animation-open');
			modalMap.classList.add('_animation-close');
		}
	}
}

// Открытие и закрытие окна обратной связи
function ModalFeedback() {
	var btn_feedbackOpen = document.querySelector('#modal-feedback_open'),
			btn_mapClose = document.querySelector('#modal-map_close');

	btn_feedbackOpen.addEventListener('click', OpenModal);

	function OpenModal(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		modalFeedback.classList.remove('_vis-off');
		modalFeedback.classList.remove('_animation-close');
		modalFeedback.classList.add('_animation-open');

		var userName = document.querySelector('#modal_feedback [name=user-name]'),
				userEmail = document.querySelector('#modal_feedback [name=user-email]'),
				userText = document.querySelector('#modal_feedback [name=user-text]'),
				btn_modalSubmit = document.querySelector('#modal-feedback_submit');

		if (!userName.value) {
			userName.focus();
		} else if (!userEmail.value) {
			userEmail.focus();
		} else if (!userText.value) {
			userText.focus();
		} else {
			btn_modalSubmit.focus();
		};
	}

	btn_feedbackClose.addEventListener('mousedown', CloseModal);
	modalFeedback.addEventListener('mousedown', CloseModal);

	function CloseModal(evt) {
		evt.stopPropagation();
		if (evt.target.id === 'modal_feedback' || evt.target.id === 'modal-feedback_close') {
			setTimeout(function () { modalFeedback.classList.add('_vis-off'); }, 250);
			modalFeedback.classList.remove('_animation-open');
			modalFeedback.classList.add('_animation-close');
		}
	}
}

// Открытие и закрытие окна оповещения о добавлении товара
function ModalBasket() {
	var modalBasketAlert = document.querySelector('#modal_basket-alert'),
			btns_buy = document.querySelectorAll('.product-article_ui-btn._buy'),
			btn_basketClose = document.querySelector('#modal-basket-alert_close'),
			btn_basketContinue = document.querySelector('#modal-basket-alert_continue'),
			btn_basketOrder = document.querySelector('#modal-basket-alert_order');

	for (let i = 0; i < btns_buy.length; i++) {
		btns_buy[i].addEventListener('click', OpenModal);
	}

	function OpenModal(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		modalBasketAlert.classList.remove('_vis-off');
		modalBasketAlert.classList.remove('_animation-close');
		modalBasketAlert.classList.add('_animation-open');
		btn_basketOrder.focus();
	}

	modalBasketAlert.addEventListener('mousedown', CloseModal);
	btn_basketClose.addEventListener('mousedown', CloseModal);
	btn_basketContinue.addEventListener('mousedown', CloseModal);

	function CloseModal(evt) {
		evt.stopPropagation();
		if (evt.target.id === 'modal-basket-alert_close' ||
				evt.target.id === 'modal-basket-alert_continue' ||
				evt.target.id === 'modal_basket-alert') {
			setTimeout(function () { modalBasketAlert.classList.add('_vis-off') }, 250);
			modalBasketAlert.classList.remove('_animation-open');
			modalBasketAlert.classList.add('_animation-close');
		}
	}
}

//---------
// 3. COUNTING PRODUCT IN BASKET AND BOOKMARK INDICATORS
//---------

function Counting() {
	// Назначаем кнопки карточки товара
	var btns_buy = document.querySelectorAll('.product-article_ui-btn._buy'),
			btns_bookmark = document.querySelectorAll('.product-article_ui-btn._bookmark'),
	// Назначаем кнопки в хедере
			link_basket = document.querySelector('#header_basket'),
			link_bookmarks = document.querySelector('#header_bookmarks'),
	// Назначаем индикаторы в кнопках хедера
			indic_basket = document.querySelector('#header_basket-count'),
			indic_bookmarks = document.querySelector('#header_bookmark-count');

	for (let i = 0; i < btns_buy.length; i++) {
		btns_buy[i].addEventListener('click', function (evt) {
			evt.preventDefault();
			indic_basket.innerHTML = parseInt(indic_basket.innerHTML) + 1;
			if (indic_basket.innerHTML > 0) {
				link_basket.classList.add('_active');
			}
		});
		btns_bookmark[i].addEventListener('click', function (evt) {
			evt.preventDefault();
			indic_bookmarks.innerHTML = parseInt(indic_bookmarks.innerHTML) + 1;
			if (indic_bookmarks.innerHTML > 0) {
				link_bookmarks.classList.add('_active');
			}
		});
	}
}

//---------
// 4. USER DATAS SAVING IN FORM FEEDBACK
//---------

function SaveUserData() {
	GetUserData(userName, userEmail, userText);

	userName.addEventListener('blur', function () {
		if (userName.value) {
			localStorage.setItem('user-name', userName.value);
			SaveUserData();
		}
	})

	userEmail.addEventListener('blur', function () {
		if (userEmail.value) {
			localStorage.setItem('user-email', userEmail.value);
			SaveUserData();
		}
	})

	userText.addEventListener('blur', function () {
		if (userText.value) {
			localStorage.setItem('user-text', userText.value);
			SaveUserData();
		}
	})
}

function GetUserData() {
	if (localStorage.getItem('user-name') && localStorage.getItem('user-name') !== userName.value) {
		userName.value = localStorage.getItem('user-name');
	}

	if (localStorage.getItem('user-email') && localStorage.getItem('user-email') !== userEmail.value) {
		userEmail.value = localStorage.getItem('user-email');
	}

	if (localStorage.getItem('user-text') && localStorage.getItem('user-text') !== userText.value) {
		userText.value = localStorage.getItem('user-text');
	}
}

function ObservingFeedback() {
	const	config = { attributeFilter: ['class'] };
	const	callback = function() {	
			if (modal_feedback.classList.contains('_vis-off')) {
				if (userName.value || userEmail.value || userText.value)
				var confirm = window.confirm('Хотите сохранить введенные данные в локальном хранилище?');
				if (!confirm) {
					localStorage.clear();
					userName.value = '';
					userEmail.value = '';
					userText.value = '';
				}
			}
		};
	const	observerFeedback = new MutationObserver(callback);

	observerFeedback.observe(modal_feedback, config);
}

//---------
// 5. PROMO-SLIDER
//---------

// Проверка существования промо-слайдера
try {
	var promoSlider = document.querySelector('.promo-slider');

	if (!promoSlider) {
		throw new ReferenceError('Отсутствует промо-слайдер');
	}

	// Назначаем кнопки управления
	var btn_BW = document.querySelector('#promo-slider_bw'),
			btn_FW = document.querySelector('#promo-slider_fw'),
	// Находим массив слайдов и пагинацию слайдов
			inputArr = document.querySelectorAll('.promo-slider_input'),
			slide1 = document.querySelector('#promo-slider_input1'),
			slide2 = document.querySelector('#promo-slider_input2');

	// Вешаем "прослушку"
	btn_BW.addEventListener('click', SliderControl);
	btn_FW.addEventListener('click', SliderControl);
} catch (err) {
	console.log(err.message);
}

// Функция управления слайдами
function SliderControl(evt) {
	var currentSlide;

	for (let i = 0; i < inputArr.length; i++) {
		if (inputArr[i].checked) {
			currentSlide = i;
		} else {
			continue;
		}
	}

	switch (evt.target.id) {
		case 'promo-slider_bw': 
			if (currentSlide !== 0) {
				currentSlide--;
				inputArr[currentSlide].checked = true;
			}; break;
		case 'promo-slider_fw': 
			if (currentSlide !== inputArr.length - 1) {
				currentSlide++;
				inputArr[currentSlide].checked = true;
			}; break;
	}
}