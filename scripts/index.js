let editButton = document.querySelector(".profile__edit-button")
let editPopup = document.querySelector(".popup")
let saveButton = document.querySelector(".popup__save-button")
let closeButton = document.querySelector(".popup__close-button")

function popupOpen() {
  editPopup.classList.add("popup_opened")
}

function popupClose() {
  editPopup.classList.remove("popup_opened")
}

editButton.addEventListener('click', popupOpen)
closeButton.addEventListener('click', popupClose)
saveButton.addEventListener('click', popupClose)

let formElement = document.querySelector(".popup__form")

let nameInput = document.querySelector(".popup__text_check_name")
let jobInput = document.querySelector(".popup__text_check_job")


function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".popup__text_check_name")
  let jobInput = document.querySelector(".popup__text_check_job")
  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__job");

  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value

  popupClose();
}



formElement.addEventListener('submit', formSubmitHandler);
saveButton.addEventListener('click', formSubmitHandler)
