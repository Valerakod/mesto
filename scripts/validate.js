// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, elements) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(elements.inputErrorClass);
  errorElement.classList.add(elements.errorClass);
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, elements) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(elements.inputErrorClass);
  errorElement.classList.remove(elements.errorClass);
  errorElement.textContent = " ";
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, elements) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, elements);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, elements);
  }
};

//проверяем поля ввода на корректность
const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
};

//функция изменения состояния кнопки
const toggleButtonState = (inputList, saveButton, elements) => {
  if (hasInvalidInput(inputList)) {
    saveButton.classList.add(elements.inactiveButtonClass);
    saveButton.setAttribute("disabled", true);
  } else {
    saveButton.classList.remove(elements.inactiveButtonClass);
    saveButton.removeAttribute("disabled");
  }
};

//функция добавляет обработчики сразу всем полям формы
const setEventListeners = (formElement, elements) => {
  const inputList = Array.from(formElement.querySelectorAll(elements.inputSelector));
  const saveButton = formElement.querySelector(elements.submitButtonSelector);
  toggleButtonState(inputList, saveButton, elements);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, elements);
      toggleButtonState(inputList, saveButton, elements);
    });
  });
};

//находим и перебираем все формы на странице
const enableValidation = (elements) => {
  const formList = Array.from(document.querySelectorAll(elements.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, elements);
    formElement.addEventListener("submit", function (evt) {
      // Отменим стандартное поведение по сабмиту
      evt.preventDefault();
    });
  });
};

//вызов валидации
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}

enableValidation(config);
