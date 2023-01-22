"use strict";

let profileButtonEdit = document.querySelector('.profile__edit-button');
let popupEdit = document.querySelector('.popup__edit');
let popup = document.querySelector('.popup');


function onClick() {
  popup.classList.remove('popup_opened');
}

function onClickEdit() {
  popup.classList.add('popup_opened');
}

profileButtonEdit.addEventListener('click', onClick);
popupEdit.addEventListener('click', onClickEdit);

let formElement = document.querySelector('.popup__form-save');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__profession');

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInput.innerHTML.value;
  jobInput.innerHTML.value;

  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);





// Работающая функция на одном элементе
//let like = document.querySelector('.places__like');
//function likeRemove () {
//like.classList.toggle('places__like_active');
//}

document.querySelectorAll('.places__like').forEach((element) => {
    element.addEventListener('click', function () {
  element.classList.toggle('places__like_active');
    });
});