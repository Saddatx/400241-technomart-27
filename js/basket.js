var basketLinkAll = document.querySelectorAll('.buy');
var basketPopup = document.querySelector('.popup-basket');
var basketClose = basketPopup.querySelector('.modal-close');
var payLink = basketPopup.querySelector('.pay');
var continueLink = basketPopup.querySelector('.continue');

for (var i = 0; i < basketLinkAll.length; i++) {
  basketLinkAll[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    basketPopup.classList.add('popup-basket-show');
  });
}

basketClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  basketPopup.classList.remove('popup-basket-show');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (basketPopup.classList.contains('popup-basket-show')) {
      basketPopup.classList.remove('popup-basket-show');
    }
  }
});

payLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  basketPopup.classList.remove('popup-basket-show');
});

continueLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  basketPopup.classList.remove('popup-basket-show');
});
