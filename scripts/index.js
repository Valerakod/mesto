let editButton = document.querySelector(".profile__edit-button");
let editPopup = document.querySelector(".popup");
let saveButton = document.querySelector(".popup__save-button");
let closeButton = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__text_check_name");
let jobInput = document.querySelector(".popup__text_check_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editPopup.classList.add("popup_opened");
}

function closePopup() {
  editPopup.classList.remove("popup_opened");
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

