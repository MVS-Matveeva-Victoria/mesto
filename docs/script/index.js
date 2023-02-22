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

// для сохранения новых карточек

const places = document.querySelector(".places");
const placesTitleInput = document.querySelector(".popup__places-input_title_value");
const placesSrcInput = document.querySelector(".popup__places-input_subtitle_value");
let popupPlacesForm = document.querySelector(".popup__places-form");
let popupPlaceAddButton = document.querySelector(".profile__button-add");
const placesItem = document.querySelector(".places__item");
//const placesItems = document.querySelectorAll('.places__item');
const placesImg = document.querySelector(".places__image");
const placesTitle = document.querySelector(".places__title");
const placesItemCloneGlobal = placesItem.cloneNode(true);
const popupTitile = document.querySelector(".popup__titile");

//для увеличения картинки
const popupImageEditButton = document.querySelector(".popup-image__edit");
const popupImage = document.querySelector(".popup-image");
const popupItem = document.querySelector(".popup-image__item");

function popupImageEdit() {
  popupImage.style.visibility = "hidden";
  popupImage.style.opacity = "0";
}

// для создания 6 карточек при загрузке страницы
let placeTitile = document.querySelectorAll(".places__title");
let imagesLink = document.querySelectorAll(".places__image");

const initialCards = [
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
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// замена карточек через JS
let nameArrow = [];
initialCards.forEach((element) => {
  nameArrow.push(element.name);
});

placeTitile.forEach((element) => {
  const placeName = document.createElement("h2");
  placeName.textContent = nameArrow.shift();
  placeName.classList.add("places__title");
  element.replaceWith(placeName);
});

let linksArrow = [];
initialCards.forEach((element) => {
  linksArrow.push(element.link);
});

imagesLink.forEach((element) => {
  const placeLink = document.createElement("img");
  placeLink.src = linksArrow.shift();
  placeLink.classList.add("places__image");
  element.replaceWith(placeLink);
});

// открытие Popup для редактирования профиля
profileRedactButton.addEventListener("click", function () {
  popupPlacesForm.style.display = "none";
  formElement.style.display = "block";
  popup.classList.add("popup_opened");
  popupInputTitleValue.value = profileTitle.textContent;
  popupInputSubtitleValue.value = profileSubtitle.textContent;
});

// сохранение новых данных из Popup в профиль
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = popupInputTitleValue.value;
  profileSubtitle.textContent = popupInputSubtitleValue.value;
  popupEdit();
});

// открытие popupPlaces
popupPlaceAddButton.addEventListener("click", function () {
  formElement.style.display = "none";
  popupPlacesForm.style.display = "block";
  popup.classList.add("popup_opened");
  popupTitile.textContent = "Новое место";
});

// взаимодействия с новыми карточками из popupPlaces
popupPlacesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const placesItemClone = placesItem.cloneNode(true);
  placesItemClone.firstChild.nextSibling.nextElementSibling.alt = "Здесь появится картинка, когда вы ее добавите";
  placesItemClone.firstChild.nextSibling.nextElementSibling.src = placesSrcInput.value;
  placesItemClone.lastChild.previousSibling.firstChild.nextSibling.textContent = placesTitleInput.value;
  places.prepend(placesItemClone);
  placesItemClone.lastChild.previousSibling.lastChild.previousSibling.addEventListener("click", function () {
    placesItemClone.lastChild.previousSibling.lastChild.previousSibling.classList.toggle("places__like_active");
  });

  const placesButtonDelete = document.querySelectorAll(".places__item-delete").forEach((element) => {
    element.addEventListener("click", function () {
      const listItem = element.closest(".places__item");
      listItem.remove();
    });
  });
  const openPopupImage = document.querySelectorAll(".places__image").forEach((element) => {
    element.addEventListener("click", function () {
      popupImage.style.visibility = "visible";
      popupImage.style.opacity = "1";
      popupItem.src = element.src;

      const listItem = element.closest(".places__item");
      elementName.textContent = listItem.lastChild.previousSibling.firstChild.nextSibling.textContent;
    });
  });
  popupEdit();
});

// закрытие popup
function popupEdit() {
  popup.classList.remove("popup_opened");
}

// удаление карочки

const placesButtonDelete = document.querySelectorAll(".places__item-delete").forEach((element) => {
  element.addEventListener("click", function () {
    const listItem = element.closest(".places__item");
    listItem.remove();
  });
});

//увеличение картинки
const placesItemTitle = document.querySelector(".places__item-title");

let elementName = document.querySelector(".popup-image__title");

const openPopupImage = document.querySelectorAll(".places__image").forEach((element) => {
  element.addEventListener("click", function () {
    popupImage.style.visibility = "visible";
    popupImage.style.opacity = "1";
    popupItem.src = element.src;

    const listItem = element.closest(".places__item");
    elementName.textContent = listItem.lastChild.previousSibling.firstChild.nextSibling.textContent;
  });
});

// активные кнопки like
document.querySelectorAll(".places__like").forEach((element) => {
  element.addEventListener("click", function () {
    element.classList.toggle("places__like_active");
  });
});

popupImageEditButton.addEventListener("click", function () {
  popupImageEdit();
});

popupEditButton.addEventListener("click", popupEdit);