export default class Card {
  constructor({data, currentUserId, handleCardClick, handleCardDelSubmit, handleAddLike, handleDelLike}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
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
    this.deleteCard = this.deleteCard.bind(this);
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
    this._cardElementImage.setAttribute("alt", this._name);
    this._cardElementTitle.textContent = this._name;


    this._setEventListners();
    return this._element;
  };

  //удаление карточки
  deleteCard = () => {
    this._element.remove();
    this._element = null;
  };


  //  метод, который принимает обновленный массив лайков в аргументе, обновляет счетчик и перекрашивает кнопку
  handleLikeCard(data) {
    console.log(data);
    this.likeCounter.textContent = data.likes.length;
    this.likeButton.classList.toggle("element__heart_active");
    this._likes = data.likes;
  }


  _setEventListners() {
    this._deleteButton = this._element.querySelector(".element__delete-icon");
        this._deleteButton.addEventListener("click", () => {
            this._handleCardDelSubmit(this);
        });
        if (this._currentUserId !== this._ownerId) {
            this._deleteButton.remove()
        }
        this.likeButton.addEventListener("click", () => {
            if (this.isLiked) {
                this._handleDelLike(this._cardId)
            } else {
                this._handleAddLike(this._cardId)
            }
        });

    this._cardElementImage.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  };
}
