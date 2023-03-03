"use strict";
//Переменные: открытие popup
const popupProfile = document.querySelector(".popup");
const profileRedactButton = document.querySelector(".profile__redact");

//Переменные: содержание инпутов popup
const popupInputTitleValue = document.querySelector(".popup__input_title_value");
const popupInputSubtitleValue = document.querySelector(".popup__input_subtitle_value");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

//Переменные: закрытие popup
const popupEditButton = document.querySelector(".popup__edit-button");

//Переменные: сохранить данные из popup в профиль
const formProfileElement = document.querySelector("#popup__form-save");

//Переменные: открыть popup-places
const popupPlaces = document.querySelector(".popup_type_places");
const profileButtonAdd = document.querySelector(".profile__button-add");

//Переменные: закрыть popup-places
const popupPlacesEditButton = document.querySelector(".popup-places__edit-button");

//Переменные: создать карточки через JS
const initialCards = [
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
];

//Переменные: сохранить карточку из popup-places
const popupPlacesButtonSave = document.querySelector(".popup-places__button");

//Переменные: увеличение картинки
const elementName = document.querySelector(".popup-image__title");
const popupImage = document.querySelector(".popup_type_image");
const popupItem = document.querySelector(".popup-image__item");
const popupImageEditButton = document.querySelector(".popup-image__edit");

//Переменные: создание карточек
const cardsContainer = document.querySelector(".places");
const placesTemplate = document.querySelector("#places-template").content;

//Переменные: сохранить данные из popup-places в places
const popupPlacesForm = document.querySelector(".popup-places__places-form");

//Функция: открыть popup
function openPopup(element) {
  element.classList.add("popup_opened");
}

//Событие: открыть popup
profileRedactButton.addEventListener("click", function () {
  openPopup(popupProfile);
  popupInputTitleValue.value = profileTitle.textContent;
  popupInputSubtitleValue.value = profileSubtitle.textContent;
});

//Функция: закрыть popup
function closePopup(popup) {
  const popupPlacesTitileValue = document.querySelector(".popup-places__places-input_title_value");
  const popupPlacesLinkValue = document.querySelector(".popup-places__places-input_subtitle_value");
  popupPlacesTitileValue.value = "";
  popupPlacesLinkValue.value = "";
  popup.classList.remove("popup_opened");
}

//Событие: закрыть popup
popupEditButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

//Событие: сохранить данные из popup в профиль
formProfileElement.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = popupInputTitleValue.value;
  profileSubtitle.textContent = popupInputSubtitleValue.value;
  closePopup(popupProfile);
});

//Событие: открыть popupPlaces
profileButtonAdd.addEventListener("click", function () {
  openPopup(popupPlaces);
});

//Событие: закрыть popupPlaces
popupPlacesEditButton.addEventListener("click", function () {
  closePopup(popupPlaces);
});

//Функция: закрытия картинки
function popupImageEdit() {
  popupImage.style.visibility = "hidden";
  popupImage.style.opacity = "0";
}

//Событие: закрыть картинку
popupImageEditButton.addEventListener("click", function () {
  popupImageEdit();
});

//Функция: создать карточку
function createCard(name, link) {
  const placesItem = placesTemplate.querySelector(".places__item").cloneNode(true);
  const placesTitle = placesItem.querySelector(".places__title");
  const placesImage = placesItem.querySelector(".places__image");
  const placesLike = placesItem.querySelector(".places__like");
  const placesItemDeleteButton = placesItem.querySelector(".places__item-delete");
  //Событие: активировать like
  placesLike.addEventListener("click", function () {
    placesLike.classList.toggle("places__like_active");
  });

  // Событие: увеличить картинку
  placesImage.addEventListener("click", function () {
    const elementName = document.querySelector(".popup-image__title");
    const popupImage = document.querySelector(".popup_type_image");
    const popupItem = document.querySelector(".popup-image__item");
    popupImage.style.visibility = "visible";
    popupImage.style.opacity = "1";
    popupItem.alt = "Тут должно быть изображение";
    popupItem.src = this.src;
    elementName.textContent = this.closest(".places__item").querySelector(".places__title").textContent;
  });

  //Событие: удалить карточку
  placesItemDeleteButton.addEventListener("click", function () {
    const listItem = placesItemDeleteButton.closest(".places__item");
    listItem.remove();
  });
  placesTitle.textContent = name;
  placesImage.src = link;
  return placesItem;
}

//Функция: Разместить карточку
function renderCard(card, container) {
  container.prepend(card);
}

//Функция: Заменить карточки
initialCards.forEach((card) => {
  const newCard = createCard(card.name, card.link);
  renderCard(newCard, cardsContainer);
});

//Событие: создать новую карточку
popupPlacesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const popupPlacesTitileValue = document.querySelector(".popup-places__places-input_title_value");
  const popupPlacesLinkValue = document.querySelector(".popup-places__places-input_subtitle_value");

  const newCard = createCard(popupPlacesTitileValue.value, popupPlacesLinkValue.value);
  renderCard(newCard, cardsContainer);
  closePopup(popupPlaces);
});