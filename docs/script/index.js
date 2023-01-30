"use strict";

// Для открытия popup
let profileRedactButton = document.querySelector(".profile__redact");
let popup = document.querySelector(".popup");

//для переноса значения из профиля в инпуты
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let popupInputTitleValue = document.querySelector(".popup__input_title_value");
let popupInputSubtitleValue = document.querySelector(".popup__input_subtitle_value");

//для закрытия попапа
let popupEditButton = document.querySelector(".popup__edit-button");

// для сохранения данных в профиль
let formElement = document.querySelector(".popup__form-save");

profileRedactButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  popupInputTitleValue.value = profileTitle.textContent;
  popupInputSubtitleValue.value = profileSubtitle.textContent;
});

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = popupInputTitleValue.value;
  profileSubtitle.textContent = popupInputSubtitleValue.value;
  popupEdit();
});

function popupEdit() {
  popup.classList.remove("popup_opened");
}

//функция для лайков к следующему спринту
//document.querySelectorAll(".places__like").forEach((element) => {
//  element.addEventListener("click", function () {
//    element.classList.toggle("places__like_active");
//  });
//});
//
//popupEditButton.addEventListener("click", popupEdit);