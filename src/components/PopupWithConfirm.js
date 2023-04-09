import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  setSubmitAction(action) {
    this._handleCardDelSubmit = action;
  }

  setEventListeners(){
  this._popupElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    this._handleCardDelSubmit();
  })
    super.setEventListeners();

  }
}
