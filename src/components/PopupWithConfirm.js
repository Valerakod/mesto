import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleCardDelSubmit) {
    super(popupSelector);
    this._buttonDelete = this._popupElement.querySelector(".element__delete-icon");
    this._handleCardDelSubmit = handleCardDelSubmit;
  }

  _setEventListeners(){
    super.setEventListeners();
    this._buttonDelete.addEventListener("click", (evt) => {
        evt.preventDefault();
        this._handleCardDelSubmit(this._cardId, this._element);
    });
  }

  open(cardId, element) {
    super.open();
    this._cardId = cardId;
    this._element = element;
    this._setEventListeners()
  }
}
