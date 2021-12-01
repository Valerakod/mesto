import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { FormValidator } from "./FormValidator.js";

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const popupImg = document.querySelector(".popup-img");
const closeButtonEdit = document.querySelector(".popup__close-button_edit");
const closeButtonAdd = document.querySelector(".popup__close-button_add");
const closeButtonImg = document.querySelector(".popup__close-button_img");
const formElementEdit = document.querySelector(".popup__form_profile");
const formElementAdd = document.querySelector(".popup__form_add");
const nameInput = document.getElementById("popup-text-check-name");
const jobInput = document.getElementById("popup-text-check-job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const addButton = document.querySelector(".profile__add-button");
const elements = document.querySelector(".elements");
const popupName = document.getElementById("popup-text-place-name");
const popupLink = document.getElementById("popup-text-place-source");
const cardName = popupImg.querySelector(".popup__element-text");
const cardImage = popupImg.querySelector(".popup__element-image");

//вызов валидации
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}

//открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  formElementAdd.reset();
  document.addEventListener("keydown", closePopupClickEsc);
  popup.addEventListener("mousedown", closePopupClickOverlay);
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupClickEsc);
  popup.removeEventListener("mousedown", closePopupClickOverlay);
}

//закрытие попапа кликом на оверлей
function closePopupClickOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget)
  }
}

//закрытие попапа кликом на ESC
function closePopupClickEsc(e) {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened")
    closePopup(popupOpened)
  }
}

//обработчик отправки формы для редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
formElementEdit.addEventListener("submit", formSubmitHandler);

//открытие 3 попапа
function openPicture(text, img) {
  openPopup(popupImg);
  cardName.textContent = text.textContent;
  cardImage.alt = img.alt;
  cardImage.src = img.src;
}


//обработчик отправки формы для добавления карточек
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const myNewCard = { name: popupName.value, link: popupLink.value };
  addNewCard(myNewCard);
  // Очищаем поля формы
  formElementAdd.reset();
  const saveButtonPopupAdd = popupAdd.querySelector(".popup__save-button");
  saveButtonPopupAdd.setAttribute("disabled", true);
  saveButtonPopupAdd.classList.add("popup__save-button_inactive");
  closePopup(popupAdd);
}

formElementAdd.addEventListener("submit", cardFormSubmitHandler);

//функция создания новых карточек
function createCard(card) {
  const card = {title, link}
  return (new Card(card, "#card")).generateCard();
}

//функция добавления карточки в контейнер
function addNewCard(card) {
  elements.prepend(createCard(card));
}
initialCards.forEach(card => { addNewCard(card) });


//обработчики событий
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
}
);
closeButtonEdit.addEventListener("click", () => closePopup(popupEdit));
addButton.addEventListener("click", () => { openPopup(popupAdd), hideInputError(formElement, inputElement), formElementAdd.reset() });
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));
closeButtonImg.addEventListener("click", () => closePopup(popupImg));

export { openPicture };
