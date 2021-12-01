import { openPicture } from "./index.js";

export class Card {
  constructor(link, title, templateSelector) {
    this.title = title;
    this.link = link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector);
    const cardElement = elementTemplate.content.firstElementChild.cloneNode(true);

    return cardElement;
  };

  //удаление карточки
  _deleteCard(event) {
    event.target.closest(".element").remove();
  };

  //лайк
  _likeActive(event) {
    event.target.classList.toggle("element__heart_active");
  };

  _setEventListners() {
    this.element.querySelector(".element__delete-icon").addEventListener("click", this._deleteCard);
    this.element.querySelector(".element__heart").addEventListener("click", this._likeActive);
    this.element.querySelector(".element__image").addEventListener("click", openPicture);
  };

  generateCard() {
    this.element = this._getTemplate();

    const cardElementImage = this.element.querySelector(".element__image");
    const cardElementTitle = this.element.querySelector(".element__text");
    cardElementImage.setAttribute("src", this.link);
    cardElementImage.setAttribute("alt", this.title);
    cardElementTitle.textContent = this.title;

    this._setEventListners();

    return this.element;
  };

}
