export class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
};
// Функция, которая добавляет класс с ошибкой
_showInputError(inputElement, errorMessage) {
  const errorElement = this._element.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(this._selectors.inputErrorClass);
  errorElement.classList.add(this._selectors.errorClass);
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
_hideInputError(inputElement) {
  const errorElement = this._element.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(this._selectors.inputErrorClass);
  errorElement.classList.remove(this._selectors.errorClass);
  errorElement.textContent = " ";
};

// Функция, которая проверяет валидность поля
_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    this._hideInputError(inputElement);
  }
};

//проверяем поля ввода на корректность
_hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid)
};

//функция изменения состояния кнопки
_toggleButtonState(inputList) {
  const saveButton = this._formElement.querySelector(this._selectors.submitButtonSelector);
  if (this._hasInvalidInput(inputList)) {
    saveButton.classList.add(this._selectors.inactiveButtonClass);
    saveButton.setAttribute("disabled", true);
  } else {
    saveButton.classList.remove(this._selectors.inactiveButtonClass);
    saveButton.removeAttribute("disabled");
  }
};

//функция добавляет обработчики сразу всем полям формы
_setEventListeners () {
  const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
  this._toggleButtonState(inputList, saveButton, elements);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList);
    });
  });
};

//находим и перебираем все формы на странице
enableValidation () {
  const formList = Array.from(document.querySelectorAll(elements.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, elements);
    formElement.addEventListener("submit", function (evt) {
      // Отменим стандартное поведение по сабмиту
      evt.preventDefault();
    });
  });
  this._setEventListeners();
}
}
