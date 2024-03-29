import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".popup__element-image");
    this._imageText = this._popupElement.querySelector(".popup__element-text");
  }

  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._imageText.textContent = name;
  }
}
