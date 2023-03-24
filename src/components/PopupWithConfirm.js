import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { clickHandleCallBack }) {
    super(popupSelector);
    this._clickHandleCallBack = clickHandleCallBack;
    this._buttonDelete = this._popup.querySelector(".popup__delete-card");
  }

  _setEventListeners(){
    this._buttonDelete.addEventListener("click", this._submit);
    super._setEventListeners();
  }

  _removeListener() {
    this._buttonDelete.removeEventListener("click", this._submit);
    super._removeListener();
  }
}
