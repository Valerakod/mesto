export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupClickOverlay = this._closePopupClickOverlay.bind(this);
  }

  //открытие попапа
  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.add("popup_opened");
  }

  //закрытие попапа
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //закрытие попапа кликом на ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //закрытие попапа кликом на оверлей
  _closePopupClickOverlay(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    const popupCloseButton = this._popupElement.querySelector(".popup__close-button");
    this._popupElement.addEventListener("mousedown", this._closePopupClickOverlay);
    popupCloseButton.addEventListener("click", () => {
      this.close()
    })

  }

}
