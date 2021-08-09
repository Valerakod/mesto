let editButton = document.querySelector(".profile__edit-button");
let popup1 = document.getElementById("popup1");
let popup2 = document.getElementById("popup2");
let popup3 = document.getElementById("popup3");
let saveButton = document.querySelector(".popup__save-button");
let closeButton = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__form_profile");
let formElementAdd = document.querySelector(".popup__form_add");
let nameInput = document.getElementById("popup-text-check-name");
let jobInput = document.getElementById("popup-text-check-job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let addButton = document.querySelector(".profile__add-button");

let placeNameInput = document.getElementById("popup-text-place-name");
let placeSourceInput = document.getElementById("popup-text-place-source");

//let cardImage = document.querySelector(".element__image")

//открытие попапа редактирования профиля
function openPopup1() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup1.classList.add("popup_opened");
}
//закрытие попапа редактирования профиля
function closePopup1() {
  popup1.classList.remove("popup_opened");
}
//открытие попапа добавления карточки
function openPopup2() {
  popup2.classList.add("popup_opened");
}
//закрытие попападобавления карточки
function closePopup2() {
  popup2.classList.remove("popup_opened");
}
//открытие попапа с картинкой
function openPopup3() {
  popup3.classList.add("popup_opened");
}
//закрытие попапа с картинкой
function closePopup3() {
  popup3.classList.remove("popup_opened");
}
//обработчик отправки формы для редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup1();
  closePopup2();
}
formElement.addEventListener("submit", formSubmitHandler);

//обработчики событий
editButton.addEventListener("click", openPopup1);
closeButton.addEventListener("click", closePopup1);
addButton.addEventListener("click", openPopup2);
closeButton.addEventListener("click", closePopup2);
//cardImage.addEventListener("click", openPopup);


//клонирую и добавляю карточки
const cardTemplate = document.getElementById("card").content;
const elements = document.querySelector(".elements")

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
];

function initCards(item) {
  const newCard = cardTemplate.firstElementChild.cloneNode(true);
  const elementText = newCard.querySelector(".element__text");
  const cardImage = newCard.querySelector(".element__image");
  elementText.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  elements.append(newCard);
}
initialCards.forEach(initCards);

let cards = document.querySelector(".element");
let deleteButton = document.querySelector(".element__delete-icon");

//добавление новых карточек
function addNewCard(card) {
  const element = cardTemplate.querySelector(".element").cloneNode(true);
  const myNewName = element.querySelector(".element__text");
  const myNewImg = element.querySelector(".element__image");
  myNewName.textContent = card.name;
  myNewImg.src = card.link;
  myNewImg.alt = card.name;
  elements.prepend(element)
}

let name = document.getElementById("popup-text-place-name");
let link = document.getElementById("popup-text-place-source");

//обработчик отправки формы для добавления карточек
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const myNewCard = {name: myNewName.value, link: myNewImg.value};
  addNewCard(myNewCard);
  closePopu2();
}
formElementAdd.addEventListener("submit", cardFormSubmitHandler);

//удаление карточки
function deleteCards(event) {
  event.target.closest(".element").remove();
  deleteButton.addEventListener("click", deleteCards)
}
deleteButton.addEventListener("click", deleteCards)

//лайк
const like = document.querySelector(".element__heart");
function likeActive() {
  like.classList.toggle("element__heart_active");
}
like.addEventListener("click", likeActive);




