"use strict";
//Переменные: открытие popup
const popupProfile = document.querySelector(".popup_type_profile");
const profileRedactButton = document.querySelector(".profile__redact");

//Переменные: содержание инпутов popup
const popupInputTitleValue = document.querySelector(".popup__input_title_value");
const popupInputSubtitleValue = document.querySelector(".popup__input_subtitle_value");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

//Переменные: закрытие popup
const popupEditButton = document.querySelector(".popup__edit-button");
const popup = document.querySelector(".popup");
const popupSaveButton = document.querySelector(".popup__button");

//Переменные: сохранить данные из popup в профиль
const formProfileElement = document.querySelector("#popup__form-save");

//Переменные: открыть popup-places
const popupPlaces = document.querySelector(".popup_type_places");
const profileButtonAdd = document.querySelector(".profile__button-add");

//Переменные: закрыть popup-places
const popupPlacesEditButton = document.querySelector(".popup-places__edit-button");
const popupPlacesOverlay = document.querySelector(".popup-places");

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

//Переменные: для работы с ошибками

const popupPlacesInput = document.querySelectorAll(".popup-places__places-input");
const popupPlacesTitileValue = document.querySelector(".popup-places__places-input_title_value");
const popupPlacesLinkValue = document.querySelector(".popup-places__places-input_subtitle_value");
const popupPlacesTitileError = document.querySelector(".popup-places__places-input_title_error");
const popupPlacesLinkError = document.querySelector(".popup-places__places-input_subtitle_error");
const popupInputTitleError = document.querySelector(".popup__input_title_error");
const popupInputSubtitleError = document.querySelector(".popup__input_subtitle_error");

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
  popup.classList.remove("popup_opened");
  hideAllErrors();
}

//Событие: закрыть popup
popupEditButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

//Добавить событие: закрыть popup при клике на фон
popupProfile.addEventListener("mousedown", function (event) {
  if (event.target === popupProfile) {
    closePopup(popupProfile);
  }
});

//Добавить событие для popupPlaces: закрыть popup при клике на фон
popupPlaces.addEventListener("mousedown", function (event) {
  if (event.target === popupPlaces) {
    closePopup(popupPlaces);
    popupPlacesTitileValue.value = "";
    popupPlacesLinkValue.value = "";
  }
});

//Добавить событие для popupImage: закрыть popup при клике на фон
popupImage.addEventListener("mousedown", function (event) {
  if (event.target === popupImage) {
    popupImageEdit();
  }
});

//Добавить событие для закрытия popup при нажатии на 'Esc'
document.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    if (popupProfile.classList.contains("popup_opened")) {
      closePopup(popupProfile);
    }
    if (popupPlaces.classList.contains("popup_opened")) {
      closePopup(popupPlaces);
      popupPlacesTitileValue.value = "";
      popupPlacesLinkValue.value = "";
    }
    if (popupImage.style.visibility === "visible" || popupImage.style.opacity === "1") {
      popupImageEdit();
    }
  }
});

//Событие: открыть popupPlaces
profileButtonAdd.addEventListener("click", function () {
  openPopup(popupPlaces);
});

//Событие: закрыть popupPlaces
popupPlacesEditButton.addEventListener("click", function () {
  const popupPlacesTitileValue = document.querySelector(".popup-places__places-input_title_value");
  const popupPlacesLinkValue = document.querySelector(".popup-places__places-input_subtitle_value");
  closePopup(popupPlaces);
  popupPlacesTitileValue.value = "";
  popupPlacesLinkValue.value = "";
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
    popupItem.src = link;
    elementName.textContent = name;
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