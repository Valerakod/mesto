export default class Card {
  constructor({data, handleCardClick, handleCardDelSubmit, handleLikeCard, currentUserId}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelSubmit = handleCardDelSubmit;
    this.likesCounter = this._element.querySelector(".element__heart-count");
    this._handleLikeCard = handleLikeCard;
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
    this.likesCounter.textContent = this._likes.length;
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
  updateLikes(data) {
    this._likes = data.likes;
    console.log(data)
      this.likesCounter.textContent = this._likes.length;
      if  (this._likes.find((data) => data._id === this._currentUserId)) {
        this.likeButton.classList.add("element__heart_active");
      } else {
        this.likeButton.classList.remove("element__heart_active");
      }
  }


   //проверяем, есть ли текущий пользователь среди лайкнувших
   hasCurrentUserLike() {
    return !!this._likes.find((like) => like._id === this._currentUserId)
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
        this._handleLikeCard(this)
    });

    this._cardElementImage.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  };
}
