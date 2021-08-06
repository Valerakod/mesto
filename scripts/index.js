let editButton = document.querySelector(".profile__edit-button");
let popup1 = document.getElementById("popup1");
let saveButton = document.querySelector(".popup__save-button");
let closeButton = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__form");
let nameInput = document.getElementById("popup-text-check-name");
let jobInput = document.getElementById("popup-text-check-job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let addButton = document.querySelector(".profile__add-button");
let addPopup = document.getElementById("popup2");
let placeNameInput = document.getElementById("popup-text-place-name");
let placeSourceInput = document.getElementById("popup-text-place-source");
let textElement = document.querySelector(".element__text");
let cardImage = document.querySelector(".element__image");
let popup3 = document.getElementById("popup3");
let like = document.querySelector(".element__heart");


function openPopup1() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup1.classList.add("popup_opened");
}

function closePopup1() {
  popup1.classList.remove("popup_opened");
}

function openPopup2() {
  popup2.classList.add("popup_opened");
}

function closePopup2() {
  popup2.classList.remove("popup_opened");
}

function openPopup3() {
  popup3.classList.add("popup_opened");
}

function closePopup3() {
  popup3.classList.remove("popup_opened");
}

function likeActive() {
  like.classList.toggle("element__heart_active");
}

editButton.addEventListener('click', openPopup1);
closeButton.addEventListener('click', closePopup1);
addButton.addEventListener('click', openPopup2);
closeButton.addEventListener('click', closePopup2);
cardImage.addEventListener('click', openPopup3);
closeButton.addEventListener('click', closePopup3);
like.addEventListener('click', likeActive);

let card = document.querySelector(".element");
let deleteButton = document.querySelector(".element__delete-icon");

function deleteCard() {
card.classList.add("elemen_delete")
}

deleteButton.addEventListener("click", deleteCard)

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup1();
  closePopup2();
}

formElement.addEventListener('submit', formSubmitHandler);




const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

