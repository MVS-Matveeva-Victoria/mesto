"use strict";

let profileButtonEdit = document.querySelector('.profile__edit-button');
let popupEdit = document.querySelector('.popup__redact');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form-save');
let nameInput = document.querySelector('.popup__input-name_value');
let jobInput = document.querySelector('.popup__input-profession_value');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function onClick() {
  popup.classList.add('popup_opened');

  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    onClickEdit()
  }

  formElement.addEventListener('submit', handleFormSubmit);
}

function onClickEdit() {
  popup.classList.remove('popup_opened');
}

document.querySelectorAll('.places__like').forEach((element) => {
  element.addEventListener('click', function() {
    element.classList.toggle('places__like_active');
  });
});

profileButtonEdit.addEventListener('click', onClick);
popupEdit.addEventListener('click', onClickEdit);