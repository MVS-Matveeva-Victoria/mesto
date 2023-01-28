"use strict";

// Для открытия popup
let profileRedactButton = document.querySelector('.profile__redact');
let popup = document.querySelector('.popup');

//для переноса значения из профиля в инпуты 
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupInputTitleValue = document.querySelector('.popup__input_title_value');
let popupInputSubtitleValue = document.querySelector('.popup__input_subtitle_value');

//для закрытия попапа
let popupEditButton = document.querySelector('.popup__edit-button');

// для сохранения данных в профиль
let saveButton = document.querySelector('.popup__button');


document.querySelector('.profile__redact').addEventListener('click', function() {
	popup.classList.add('popup_opened');
  popupInputTitleValue.value = profileTitle.textContent;
  popupInputSubtitleValue.value = profileSubtitle.textContent;
});


function saveForm(event) {
  event.preventDefault();
	profileTitle.textContent = popupInputTitleValue.value;
	profileSubtitle.textContent = popupInputSubtitleValue.value;
	
	popup.classList.remove('popup_opened');
}

function popupEdit() {
	popupInputTitleValue.value = profileTitle.textContent;
  popupInputSubtitleValue.value = profileSubtitle.textContent;
	
	popup.classList.remove('popup_opened');
}

saveButton.addEventListener('click', function(event) {
  saveForm(event);
});

popupEditButton.addEventListener('click', popupEdit);

//функция для лайков
document.querySelectorAll('.places__like').forEach((element) => {
  element.addEventListener('click', function() {
  element.classList.toggle('places__like_active');
  });
});