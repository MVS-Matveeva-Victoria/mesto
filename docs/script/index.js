"use strict";
//Переменные: открытие popup
const popup = document.querySelector(".popup");
const profileRedactButton = document.querySelector(".profile__redact");

//Переменные: содержание инпутов popup
const popupInputTitleValue = document.querySelector(".popup__input_title_value");
const popupInputSubtitleValue = document.querySelector(".popup__input_subtitle_value");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

//Переменные: закрытие popup
const popupEditButton = document.querySelector(".popup__edit-button");

//Переменные: сохранить данные из popup в профиль
const formElement = document.querySelector(".popup__form-save");

//Переменные: открыть popup-places
const popupPlaces = document.querySelector(".popup-places");
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
const popupImage = document.querySelector(".popup-image");
const popupItem = document.querySelector(".popup-image__item");
const popupImageEditButton = document.querySelector(".popup-image__edit");

//Переменные: создание карточек
const cardsContainer = document.querySelector(".places");
const placesTemplate = document.querySelector("#places-template").content;

//Переменные: сохранить данные из popup-places в places
const popupPlacesForm = document.querySelector(".popup-places__places-form");

//Функция: открыть popup
function popupOpen(element) {
  element.classList.add("open-popup");
}

//Событие: открыть popup
profileRedactButton.addEventListener("click", function () {
  popupOpen(popup);
  popupInputTitleValue.value = profileTitle.textContent;
  popupInputSubtitleValue.value = profileSubtitle.textContent;
});

//Функция: закрыть popup
function closePopup(popup) {
  popup.classList.remove("open-popup");
}

//Событие: закрыть popup
popupEditButton.addEventListener("click", function () {
  closePopup(popup);
});

//Событие: сохранить данные из popup в профиль
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = popupInputTitleValue.value;
  profileSubtitle.textContent = popupInputSubtitleValue.value;
  closePopup(popup);
});

//Событие: открыть popupPlaces
profileButtonAdd.addEventListener("click", function () {
  popupOpen(popupPlaces);
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

  // Событие: активировать like
  newCard.querySelector(".places__like").addEventListener("click", function () {
    newCard.querySelector(".places__like").classList.toggle("places__like_active");
  });

  // Событие: увеличить картинку
  newCard.querySelector(".places__image").addEventListener("click", function () {
    const element = event.target;
    const popupImage = document.querySelector(".popup-image");
    const popupTitle = popupImage.querySelector(".popup-image__title");
    const popupItem = popupImage.querySelector(".popup-image__item");

    popupTitle.textContent = element.closest(".places__item").querySelector(".places__title").textContent;
    popupItem.src = element.src;
    popupImage.style.visibility = "visible";
    popupImage.style.opacity = "1";
  });

  //Событие: удалить карточку
  newCard.querySelector(".places__item-delete").addEventListener("click", function () {
    const listItem = newCard.closest(".places__item");
    listItem.remove();
  });
});

//Событие: создать новую карточку
popupPlacesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const popupPlacesTitileValue = document.querySelector(".popup-places__places-input_title_value");
  const popupPlacesLinkValue = document.querySelector(".popup-places__places-input_subtitle_value");

  const newCard = createCard(popupPlacesTitileValue.value, popupPlacesLinkValue.value);
  renderCard(newCard, cardsContainer);
  closePopup(popupPlaces);
  newCard.querySelector(".places__like").addEventListener("click", function () {
    newCard.querySelector(".places__like").classList.toggle("places__like_active");
  });

  newCard.querySelector(".places__image").addEventListener("click", function () {
    const elementName = document.querySelector(".popup-image__title");
    const popupImage = document.querySelector(".popup-image");
    const popupItem = document.querySelector(".popup-image__item");
    popupImage.style.visibility = "visible";
    popupImage.style.opacity = "1";
    popupItem.src = this.src;
    elementName.textContent = this.closest(".places__item").querySelector(".places__title").textContent;
  });
  newCard.querySelector(".places__item-delete").addEventListener("click", function () {
    const listItem = newCard.closest(".places__item");
    listItem.remove();
  });
});