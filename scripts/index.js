let editButton = document.querySelector(".profile__edit-button")
let editPopup = document.querySelector(".popup")
let saveButton = document.querySelector(".popup__save-button")
let closeButton = document.querySelector(".popup__close-button")

function popupOpen() {
  editPopup.classList.add(".popup_opened")
}

function popupClose() {
  editPopup.classList.remove(".popup_opened")
}

editButton.addEventListener('click', popupOpen)
closeButton.addEventListener('click', popupClose)
