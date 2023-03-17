"use strict";

//Функция: очистить border-bottom
function cleanBorderBottom(item) {
  item.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
}

//Функция: сделать border-bottom красным
function redBorderBottom(item) {
  item.style.borderBottom = "1px solid #FF0000";
}

//Функция: Показать ошибки в input в PopupPlaces
function showErrors(input, error) {
  if (!input.value) {
    error.textContent = "Вы пропустили это поле.";
    redBorderBottom(input);
  } else if (input.type === "url" && !isValidLink(input.value)) {
    error.textContent = "Введите корректную ссылку.";
    redBorderBottom(input);
  } else if (popupPlacesTitileValue.value.length < 2 || popupPlacesTitileValue.value.length > 30) {
    error.textContent = "Количество символов должно быть от 2 до 30.";
    redBorderBottom(input);
  } else {
    error.textContent = "";
    cleanBorderBottom(input);
  }
}

//Функция: Скрыть ошибки в input при вводе текста
function hideErrorOnInput(input, error) {
  input.addEventListener("input", function () {
    error.textContent = "";
    cleanBorderBottom(input);
  });
}

//Функция: Очистить ошибки в input
function clearAllErrors(error) {
  error.textContent = "";
  cleanBorderBottom(error.previousElementSibling);
}

//Функция: Скрыть ошибки в обоих input popupPlaces
function hideAllErrors() {
  clearAllErrors(popupPlacesTitileError);
  clearAllErrors(popupPlacesLinkError);
}

//Функция: Проверка на ссылку
function isValidLink(link) {
  const linkRegExp = /^(http|https):\/\/[^ "]+$/;
  return linkRegExp.test(link);
}

//Функция: проверки на валидность формы и активации кнопки
function toggleButtonActive() {
  const formIsValid = popupPlacesTitileValue.value && popupPlacesLinkValue.value && (!popupPlacesLinkValue.type === "url" || isValidLink(popupPlacesLinkValue.value));
  if (formIsValid) {
    popupPlacesButtonSave.classList.add("popup-places__button_active");
  } else {
    popupPlacesButtonSave.classList.remove("popup-places__button_active");
  }
}

//Событие: показать ошибку в inputTitle
popupPlacesTitileValue.addEventListener("input", function () {
  showErrors(popupPlacesTitileValue, popupPlacesTitileError);
  hideErrorOnInput(popupPlacesTitileValue, popupPlacesTitileError);
  toggleButtonActive();
});

//Событие: показать ошибку в inputSubtitle
popupPlacesLinkValue.addEventListener("input", function () {
  showErrors(popupPlacesLinkValue, popupPlacesLinkError);
  hideErrorOnInput(popupPlacesLinkValue, popupPlacesLinkError);
  toggleButtonActive();
});

//Событие: создать новую карточку
popupPlacesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  showErrors(popupPlacesTitileValue, popupPlacesTitileError);
  showErrors(popupPlacesLinkValue, popupPlacesLinkError);
  toggleButtonActive();

  const formIsValid = popupPlacesTitileValue.value && popupPlacesLinkValue.value && (!popupPlacesLinkValue.type === "url" || isValidLink(popupPlacesLinkValue.value));
  if (formIsValid) {
    const newCard = createCard(popupPlacesTitileValue.value, popupPlacesLinkValue.value);
    renderCard(newCard, cardsContainer);
    popupPlacesTitileValue.value = "";
    popupPlacesLinkValue.value = "";
    closePopup(popupPlaces);
  }
});

//Функция: Показать ошибки в input в PopupProfile
function showErrorsProfile(input, error) {
  if (!input.value) {
    error.textContent = "Вы пропустили это поле.";
    redBorderBottom(input);
  } else if (input === popupInputTitleValue && (input.value.length < 2 || input.value.length > 40)) {
    error.textContent = "Количество символов должно быть от 2 до 40.";
    redBorderBottom(input);
  } else if (input === popupInputSubtitleValue && (input.value.length < 2 || input.value.length > 200)) {
    error.textContent = "Количество символов должно быть от 2 до 200.";
    redBorderBottom(input);
  } else {
    error.textContent = "";
    cleanBorderBottom(input);
  }
}

//Функция: Скрыть ошибки в обоих input popupProfile
function hideAllErrorsProfile() {
  clearAllErrors(popupInputTitleError);
  clearAllErrors(popupInputSubtitleError);
}

//Событие: показать ошибку в popupInputTitleValue
popupInputTitleValue.addEventListener("input", function () {
  showErrorsProfile(popupInputTitleValue, popupInputTitleError);
  hideErrorOnInput(popupInputTitleValue, popupInputTitleError);

  const titleIsValid = popupInputTitleValue.value && popupInputTitleValue.value.length >= 2 && popupInputTitleValue.value.length <= 40;
  const subtitleIsValid = popupInputSubtitleValue.value && popupInputSubtitleValue.value.length >= 2 && popupInputSubtitleValue.value.length <= 200;

  const popupSaveButton = document.querySelector(".popup__button");

  if (titleIsValid && subtitleIsValid) {
    popupSaveButton.classList.add("popup__button_active");
  } else {
    popupSaveButton.classList.remove("popup__button_active");
  }
});

//Событие: показать ошибку в popupInputSubtitleValue
popupInputSubtitleValue.addEventListener("input", function () {
  showErrorsProfile(popupInputSubtitleValue, popupInputSubtitleError);
  hideErrorOnInput(popupInputSubtitleValue, popupInputSubtitleError);

  const titleIsValid = popupInputTitleValue.value && popupInputTitleValue.value.length >= 2 && popupInputTitleValue.value.length <= 40;
  const subtitleIsValid = popupInputSubtitleValue.value && popupInputSubtitleValue.value.length >= 2 && popupInputSubtitleValue.value.length <= 200;

  const popupSaveButton = document.querySelector(".popup__button");

  if (titleIsValid && subtitleIsValid) {
    popupSaveButton.classList.add("popup__button_active");
  } else {
    popupSaveButton.classList.remove("popup__button_active");
  }
});

//Событие: сохранить изменения в профиле
formProfileElement.addEventListener("submit", function (event) {
  event.preventDefault();
  showErrorsProfile(popupInputTitleValue, popupInputTitleError);
  showErrorsProfile(popupInputSubtitleValue, popupInputSubtitleError);

  const titleIsValid = popupInputTitleValue.value && popupInputTitleValue.value.length >= 2 && popupInputTitleValue.value.length <= 40;
  const subtitleIsValid = popupInputSubtitleValue.value && popupInputSubtitleValue.value.length >= 2 && popupInputSubtitleValue.value.length <= 200;

  if (titleIsValid && subtitleIsValid) {
    profileTitle.textContent = popupInputTitleValue.value;
    profileSubtitle.textContent = popupInputSubtitleValue.value;
    closePopup(popupProfile);
  }
});