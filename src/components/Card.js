export default class Card {
  constructor(title, link, data, templateSelector, handleCardClick, handleCardDelSubmit, handleAddLike, handleDelLike) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelSubmit = handleCardDelSubmit;
    this._handleAddLike = handleAddLike;
    this._handleDelLike = handleDelLike;
    this.isLiked = false;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._currentUserId = currentUserId;
    this._deleteCard = this._deleteCard.bind(this);
    //this._likeActive = this._likeActive.bind(this);
  };

  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector);
    const cardElement = elementTemplate.content.firstElementChild.cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._cardElementImage = this._element.querySelector(".element__image");
    this._cardElementTitle = this._element.querySelector(".element__text");
    this.likeButton = this._element.querySelector(".element__heart");
    this.likeCounter = this._element.querySelector(".element__heart-count")
    this.likeCounter.textContent = this._likes.length;
    this._cardElementImage.setAttribute("src", this._link);
    this._cardElementImage.setAttribute("alt", this._title);
    this._cardElementTitle.textContent = this._title;
    this._likes.forEach(element => {
      if (element._id === this._currentUserId) {
          this.likeButton.classList.add("element__heart_active");
          this.isLiked = true
      }
  });

    this._setEventListners();
    return this._element;
  };

  //удаление карточки
  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  //лайк
  //_likeActive(event) {
   // event.target.classList.toggle("element__heart_active");
  //};

  _setEventListners() {
    this._deleteButton = this._element.querySelector(".element__delete-icon");
        this._deleteButton.addEventListener("click", (event) => {
            this._handleCardDelSubmit(this._cardId, event.target);
        });
        if (this._currentUserId !== this._ownerId) {
            this._deleteButton.remove()
        }
        this._imageElement.addEventListener("click", () => {
            this._handleCardClick(this._title, this._link)
        });
        this.likeButton.addEventListener("click", () => {
            if (this.isLiked) {
                this._handleDelLike(this._cardId)
            } else {
                this._handleAddLike(this._cardId)
            }
        });
   // this._element.querySelector(".element__heart").addEventListener("click", this._likeActive);
    this._cardElementImage.addEventListener("click", () => this._handleCardClick(this._title, this._link));
  };
}
