import "./index.css"
import Card from "../components/Card.js";
import initialCards from "../components/initial-cards.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  selectors,
  editButton,
  formElementAdd,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  addButton,
} from "../utils/constants.js";


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
    cardList.addItem(createCard(title, link));

  newCard.close();
  formElementAdd.reset();
}})
newCard.setEventListeners();


//обработчик события при добавлении карточки
addButton.addEventListener("click", () => {
  formAddCardValidator.restartFormValidation();
  newCard.open();
});

//форма редактирования профиля
const newProfile = new PopupWithForm(".popup-edit", {
  handleFormSubmit: () => {
    userInfo.setUserInfo({
      name: nameInput.value,
      about: jobInput.value
    });
    newProfile.close();
}});
newProfile.setEventListeners();


//обработчик события при редактировании профиля
editButton.addEventListener("click", () => {
  formEditProfileValidator.restartFormValidation();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name
  jobInput.value = about
  newProfile.open();
});

//для каждой формы включаю экземпляр валидатора и включаю валидацию.
const formEditProfile = document.querySelector(".popup-edit");
const formEditProfileValidator = new FormValidator(selectors, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCard = document.querySelector(".popup-add");
const formAddCardValidator = new FormValidator(selectors, formAddCard);
formAddCardValidator.enableValidation();


