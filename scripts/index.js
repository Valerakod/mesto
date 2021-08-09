const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popup1 = document.getElementById("popup1");
const popup2 = document.getElementById("popup2");
const popup3 = document.getElementById("popup3");
const saveButton = document.querySelector(".popup__save-button");
const closeButtonEdit = document.querySelector(".popup__close-button_edit");
const closeButtonAdd = document.querySelector(".popup__close-button_add");
const closeButtonImg = document.querySelector(".popup__close-button_img");
const formElement = document.querySelector(".popup__form_profile");
const formElementAdd = document.querySelector(".popup__form_add");
const nameInput = document.getElementById("popup-text-check-name");
const jobInput = document.getElementById("popup-text-check-job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const addButton = document.querySelector(".profile__add-button");
const placeNameInput = document.getElementById("popup-text-place-name");
const placeSourceInput = document.getElementById("popup-text-place-source");
const cardTemplate = document.getElementById("card").content;
const elements = document.querySelector(".elements");
const cards = document.querySelector(".element");
const popupName = document.getElementById("popup-text-place-name");
const popupLink = document.getElementById("popup-text-place-source");

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
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  closePopup(popup1);
}
formElement.addEventListener("submit", formSubmitHandler);

//массив какточек

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

//обработчик отправки формы для добавления карточек
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const myNewCard = { name: popupName.value, link: popupLink.value };
  addNewCard(myNewCard);
  // Очищаем поля формы
  formElementAdd.reset();
  closePopup(popup);
}
formElementAdd.addEventListener("submit", cardFormSubmitHandler);

//клонирование и добавление новых карточек
function addNewCard(card) {
  const element = cardTemplate.querySelector(".element").cloneNode(true);
  const myNewName = element.querySelector(".element__text");
  const myNewImg = element.querySelector(".element__image");
  myNewName.textContent = card.name;
  myNewImg.src = card.link;
  myNewImg.alt = card.name;
  myNewImg.addEventListener("click", () => openPicture(myNewName, myNewImg));
  const like = element.querySelector(".element__heart");
  like.addEventListener("click", likeActive);
  const deleteButton = element.querySelector(".element__delete-icon");
  deleteButton.addEventListener("click", deleteCards);
  elements.prepend(element);
}
initialCards.forEach(card => { addNewCard(card) });


//открытие 3 попапа
function openPicture(text, img) {
  openPopup(popup3);
  popup3.querySelector(".popup__element-text").textContent = text.textContent;
  popup3.querySelector(".popup__element-image").alt = img.alt;
  popup3.querySelector(".popup__element-image").src = img.src;
}

//удаление карточки
function deleteCards(event) {
  event.target.closest(".element").remove();
}

//лайк
function likeActive(event) {
  event.target.classList.toggle("element__heart_active");
}

//обработчики событий
editButton.addEventListener("click", () => openPopup(popup));
closeButtonEdit.addEventListener("click", () => closePopup(popup1));
addButton.addEventListener("click", () => openPopup(popup2));
closeButtonAdd.addEventListener("click", () => closePopup(popup2));
closeButtonImg.addEventListener("click", () => closePopup(popup3));
