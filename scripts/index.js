const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const popupImg = document.querySelector(".popup-img");
const saveButton = document.querySelector(".popup__save-button");
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
const placeNameInput = document.getElementById("popup-text-place-name");
const placeSourceInput = document.getElementById("popup-text-place-source");
const cardTemplate = document.getElementById("card").content;
const elements = document.querySelector(".elements");
const cards = document.querySelector(".element");
const popupName = document.getElementById("popup-text-place-name");
const popupLink = document.getElementById("popup-text-place-source");
const cardName = popupImg.querySelector(".popup__element-text");
const cardImage = popupImg.querySelector(".popup__element-image");

//открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
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

//удаление карточки
function deleteCard(event) {
  event.target.closest(".element").remove();
}

//лайк
function likeActive(event) {
  event.target.classList.toggle("element__heart_active");
}


//обработчик отправки формы для добавления карточек
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const myNewCard = { name: popupName.value, link: popupLink.value };
  addNewCard(myNewCard);
  // Очищаем поля формы
  formElementAdd.reset();
  closePopup(popupAdd);
}
formElementAdd.addEventListener("submit", cardFormSubmitHandler);

//функция создания новых карточек
function createCard(card) {
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
  deleteButton.addEventListener("click", deleteCard);
  return element; //возвращается созданная карточка
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
addButton.addEventListener("click", () => openPopup(popupAdd));
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));
closeButtonImg.addEventListener("click", () => closePopup(popupImg));
