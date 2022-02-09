import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
  }

  //метод собирает данные всех полей формы
  _getInputValues() {
    //достаем все элементы полей
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    //создаем пустой объект
    this._formValues = {};
    //добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    //возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  }

}
