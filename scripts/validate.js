// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__input-error_active");
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = " ";
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

//проверяем поля ввода на корректность
const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
};

//функция изменения состояния кнопки
const toggleButtonState = (inputList, saveButton) => {
  if (hasInvalidInput(inputList)) {
    saveButton.classList.add("popup__save-button_inactive");
    saveButton.setAttribute("disabled", true);
  } else {
    saveButton.classList.remove("popup__save-button_inactive");
    saveButton.removeAttribute("disabled");
  }
};

//функция добавляет обработчики сразу всем полям формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const saveButton = formElement.querySelector(".popup__save-button");
  toggleButtonState(inputList, saveButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, saveButton);
    });
  });
};

//находим и перебираем все формы на странице
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
    formElement.addEventListener("submit", function (evt) {
      // Отменим стандартное поведение по сабмиту
      evt.preventDefault();
    });
  });
};


enableValidation();
