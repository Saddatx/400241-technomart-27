var messageLink = document.querySelector('.popup-lost-link');
var messagePopup = document.querySelector('.lost-message');
var messageClose = messagePopup.querySelector('.modal-close');
var messageForm = messagePopup.querySelector('form');
var userName = messagePopup.querySelector('[name=lost-name]');
var userMessage = messagePopup.querySelector('[name=lost-message]');

// проверка имени в хранилище сайта
var isStorageSupport = true;
var storage = '';

try {
  storage = localStorage.getItem('userName');
} catch (err) {
  isStorageSupport = false;
}

// анимация закрытия окна

function fly() {
  messagePopup.classList.remove('modal-error');
  messagePopup.classList.remove('lost-message-hide');
  messagePopup.offsetWidth = messagePopup.offsetWidth;
  messagePopup.classList.add('lost-message-hide');
  messageForm.reset();
};

// открыть окно

messageLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  messagePopup.classList.remove('modal-error');
  messagePopup.classList.remove('lost-message-hide');
  messagePopup.classList.add('lost-message-show');

  // фокус при открытии на поле name
  if (storage) {
    userName.value = storage;
    userMessage.focus();
  } else {
    userName.focus();
  }
});

// закрыть окно

messageClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  fly();
  setTimeout(function () {
    messagePopup.classList.remove('lost-message-show');
  }, 500);
});

// закрыть окно кнопкой Esc

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (messagePopup.classList.contains('lost-message-show')) {
      fly();
      setTimeout(function () {
        messagePopup.classList.remove('lost-message-show');
      }, 500);
    }
  }
});

// проверка наличия имени пользователя и текста в сообщении
// и отправка формы

messageForm.addEventListener('submit', function (evt) {
  if (!userName.value || !userMessage.value) {
    evt.preventDefault();
    messagePopup.classList.remove('modal-error');
    messagePopup.offsetWidth = messagePopup.offsetWidth;
    messagePopup.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('userName', userName.value);
    }
  }
});
