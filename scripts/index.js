const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popup1 = document.getElementById("popup1");
const popup2 = document.getElementById("popup2");
const popup3 = document.getElementById("popup3");
const saveButton = document.querySelector(".popup__save-button");
const closeButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__form_profile");
const formElementAdd = document.querySelector(".popup__form_add");
const nameInput = document.getElementById("popup-text-check-name");
const jobInput = document.getElementById("popup-text-check-job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const addButton = document.querySelector(".profile__add-button");
const placeNameInput = document.getElementById("popup-text-place-name");
const placeSourceInput = document.getElementById("popup-text-place-source");
//let cardImage = document.querySelector(".element__image")

//открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
//закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}


//обработчик отправки формы для редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popup1);
  closePopup(popup2);

}
formElement.addEventListener("submit", formSubmitHandler);

//обработчики событий
editButton.addEventListener("click", openPopup(popup1));
closeButton.addEventListener("click", closePopup(popup));
addButton.addEventListener("click", openPopup(popup2));
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

const popupName = document.getElementById("popup-text-place-name");
const popupLink = document.getElementById("popup-text-place-source");

//обработчик отправки формы для добавления карточек
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const myNewCard = {name: popupName.value, link: popupLink.value};
  addNewCard(myNewCard);
  // Очищаем поля формы
  formElementAdd.reset();

  closePopup(popup);
}
formElementAdd.addEventListener("submit", cardFormSubmitHandler);

//удаление карточки
function deleteCards(event) {
  event.target.closest(".element").remove();
}
deleteButton.addEventListener("click", deleteCards)

//лайк
const like = document.querySelector(".element__heart");
function likeActive(event) {
  event.target.classList.toggle("element__heart_active");
}
like.addEventListener("click", likeActive);

//открытие 3 попапа
function openPicture (text, img) {
  openPopup(popup3);
popup3.querySelector(".popup__text").textContent = text.textContent;
popup3.querySelector(".popup__image").alt = img.alt;
popup3.querySelector(".popup__image").src = img.src;
}


