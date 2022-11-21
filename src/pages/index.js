import "./index.css"
import Card from "../components/Card.js";
import initialCards from "../components/initial-cards.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


const editButton = document.querySelector(".profile__edit-button");
//const popupEdit = document.querySelector(".popup-edit");
//const popupAdd = document.querySelector(".popup-add");
//const popupImg = document.querySelector(".popup-img");
//const closeButtonEdit = document.querySelector(".popup__close-button_edit");
//const closeButtonAdd = document.querySelector(".popup__close-button_add");
//const closeButtonImg = document.querySelector(".popup__close-button_img");
const formElementEdit = document.querySelector(".popup__form_profile");
const formElementAdd = document.querySelector(".popup__form_add");
const nameInput = document.querySelector(".popup-text-check-name");
const jobInput = document.querySelector(".popup-text-check-job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const addButton = document.querySelector(".profile__add-button");
//const elements = document.querySelector(".elements");
//const popupName = document.getElementById("popup-text-place-name");
//const popupLink = document.getElementById("popup-text-place-source");
//const cardName = popupImg.querySelector(".popup__element-text");
//const cardImage = popupImg.querySelector(".popup__element-image");
//const saveButtonPopupAdd = document.querySelector(".popup__save-button");

//вызов валидации
const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}

//обработчик отправки формы для редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  newProfile.close();
}
formElementEdit.addEventListener("submit", handleProfileFormSubmit);


//инициализация userinfo
const userInfo = new UserInfo({
  userName: profileName,
  userAbout: profileJob
})

//открытие картинки
const popupOpenImage = new PopupWithImage(".popup-img");

 function handleCardClick(title, link) {
  popupOpenImage.open(title, link);
}
  popupOpenImage.setEventListeners();

//функция создания новых карточек
function createCard(title, link) {
  const card = new Card(title, link, "#card", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}


//инициализируем класс, ответственный за добавление формы на страницу
const cardList = new Section(
  {
    items: initialCards,
    renderer: (title, link) => cardList.addItem(createCard(title, link))
  },
  ".elements"
);
cardList.renderItems();


//добавление карточки в контейнер
const newCard = new PopupWithForm(".popup-add", {
  handleFormSubmit: ({title, link}) => {
    //newCard.reset();
    cardList.addItem(createCard(title, link));
  }
})
newCard.setEventListeners();

//обработчик отправки формы для добавления карточек
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  // Очищаем поля формы
  newCard.close();
  formElementAdd.reset();
}
formElementAdd.addEventListener("submit", handleCardFormSubmit);

//форма редактирования профиля
const newProfile = new PopupWithForm(".popup-edit", {
  handleFormSubmit: (data) =>
    userInfo.setUserInfo({
      name: data.name,
      about: data.about
    })
})
newProfile.setEventListeners();

//обработчик события при редактировании профиля
editButton.addEventListener("click", () => {
  formEditProfileValidator.restartFormValidation();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name
  jobInput.value = about
  newProfile.open();
});

//обработчик события при добавлении карточки
addButton.addEventListener("click", () => {
  formAddCardValidator.restartFormValidation();
  newCard.open();
});


//для каждой формы включаю экземпляр валидатора и включаю валидацию.
const formEditProfile = document.querySelector(".popup-edit");
const formEditProfileValidator = new FormValidator(selectors, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCard = document.querySelector(".popup-add");
const formAddCardValidator = new FormValidator(selectors, formAddCard);
formAddCardValidator.enableValidation();


