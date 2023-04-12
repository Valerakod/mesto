import "./index.css"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
import {
  selectors,
  editButton,
  formElementAdd,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  profileAvatar,
  addButton,
  deleteElement,
  //popupDeleteConfirmation,
  profileAvatarEditButton,
} from "../utils/constants.js";
import Api from "../components/Api.js";

let userId
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "5fcf59d4-83ea-4773-9206-282bfebd1adc",
    'Content-Type': "application/json"
  }
});

//инициализация userinfo
const userInfo = new UserInfo({
  userName: profileName,
  userAbout: profileJob,
  userAvatar: profileAvatar
}
)

//открытие картинки
const popupOpenImage = new PopupWithImage(".popup-img");

  popupOpenImage.setEventListeners();


//попап удаления карточки
const removeCardConfirm = new PopupWithConfirm(".popup_element_delete-card");
removeCardConfirm.setEventListeners();


//функция создания новых карточек, удаление и рабочий лайк
function createCard(data, templateSelector) {
  const card = new Card({
    data,
    handleCardClick: () => {
      popupOpenImage.open(data.name, data.link);
    },
    handleLikeCard: (card) => {
    if (card.hasCurrentUserLike()) {
      api.deleteLike(card._cardId)
        .then((data) => {
        card.updateLikes(data);
      });
    } else {
      api.addLike(card._cardId)
      .then((data) => {
        card.updateLikes(data);
      })}},
    handleCardDelSubmit: (card) => {
        removeCardConfirm.open();
        console.log(card);
        removeCardConfirm.setSubmitAction(() => {
          api.deleteCard(card._cardId)
          .then(() => {
            card.deleteCard();
            removeCardConfirm.close();
          });
        })
        .catch((err) => console.log(`Error with createCard handleCardDelSubmit` + err))
      },
      currentUserId: userId
    }, templateSelector);


  const cardElement = card.generateCard();
  return cardElement;
  }

//инициализируем класс, ответственный за добавление формы на страницу
const cardList = new Section(
  {

    renderer: (data) => cardList.setItemAppend(createCard(data, "#card"))
  },
  ".elements"
);


//добавление карточки в контейнер
const newCard = new PopupWithForm(".popup-add", {
  handleFormSubmit: (data) => {
    newCard.isLoading(true);
    api.addCard({
      title: data.title,
      link: data.link
  })
  .then((data) => {
    cardList.addItem(createCard(data, "#card"));

  newCard.close();
  formElementAdd.reset();
})
.catch((err) => console.log(`Error with newCard` + err))
.finally(() => {
  newCard.isLoading(false)
})
}
});
newCard.setEventListeners();


//обработчик события при добавлении карточки
addButton.addEventListener("click", () => {
  formAddCardValidator.restartFormValidation();
  newCard.open();
});

//форма редактирования профиля
const newProfile = new PopupWithForm(".popup-edit", {
  handleFormSubmit: (data) => {
    newProfile.isLoading(true);

    api.editProfileInfo(
      data["popup-text-check-name"],
      data["popup-text-check-job"]
  )
    .then((data) => {
      userInfo.setUserInfo({

          name: data.name,
          about: data.about
      });
      newProfile.isLoading(false);
      newProfile.close();
  })
  .catch((err) => console.log(`Error with newProfile` + err))
}
});
newProfile.setEventListeners();



//обработчик события при редактировании профиля
editButton.addEventListener("click", () => {
  formEditProfileValidator.restartFormValidation();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name
  jobInput.value = about
  newProfile.open();
});

//форма редактирования аватара
const popupEditAvatar = new PopupWithForm(".popup_avatar", {
  handleFormSubmit: (info) => {
      popupEditAvatar.isLoading(true);
      api.setAvatar({
          avatar: info.avatar
      })
          .then((data) => {
              userInfo.setUserInfo({
                  name: data.name,
                  about: data.about,
                  avatar: data.avatar
              });
              popupEditAvatar.close();
          })
          .catch((err) => console.log(`Error with popupEditAvatar` + err));
  }
});

//обработчик события при редактировании аватара
profileAvatarEditButton.addEventListener("click", () => {
  popupEditAvatarFormValidator.restartFormValidation();
  popupEditAvatar.open();
});

popupEditAvatar.setEventListeners();


const cardsData = api.getInitialCards();
const getUserData = api.getUserInfo();

Promise.all([cardsData, getUserData])
    .then(([data, user]) => {

        userInfo.setUserInfo({
            name: user.name,
            about: user.about,
            avatar: user.avatar
        });

        userId = user._id;

        cardList.renderItems(data);
    })
    .catch((err) => console.log(`Error with promises...` + err));



//для каждой формы включаю экземпляр валидатора и включаю валидацию.
const formEditProfile = document.querySelector(".popup-edit");
const formEditProfileValidator = new FormValidator(selectors, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCard = document.querySelector(".popup-add");
const formAddCardValidator = new FormValidator(selectors, formAddCard);
formAddCardValidator.enableValidation();

const popupEditAvatarForm = document.querySelector(".popup_avatar");
const popupEditAvatarFormValidator = new FormValidator(selectors, popupEditAvatarForm);
popupEditAvatarFormValidator.enableValidation();

