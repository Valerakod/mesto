export default class Card {
  constructor(title, link, templateSelector, handleCardClick) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector);
    const cardElement = elementTemplate.content.firstElementChild.cloneNode(true);
    return cardElement;
  };

  //удаление карточки
  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  //лайк
  _likeActive(event) {
    event.target.classList.toggle("element__heart_active");
  };

  _setEventListners() {
    this._element.querySelector(".element__delete-icon").addEventListener("click", this._deleteCard);
    this._element.querySelector(".element__heart").addEventListener("click", this._likeActive);
    this._element.querySelector(".element__image").addEventListener("click", this._handleCardClick(this._title, this._link));
  };

  generateCard() {
    this._element = this._getTemplate();

    const cardElementImage = this._element.querySelector(".element__image");
    const cardElementTitle = this._element.querySelector(".element__text");
    cardElementImage.setAttribute("src", this._link);
    cardElementImage.setAttribute("alt", this._title);
    cardElementTitle.textContent = this._title;

    this._setEventListners();

    return this._element;
  };
}
