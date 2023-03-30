import "./index.css"
import Card from "../components/Card.js";
import initialCards from "../components/initial-cards.js";
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
  userAbout: profileJob
})

//открытие картинки
const popupOpenImage = new PopupWithImage(".popup-img");
 function handleCardClick(title, link) {
  popupOpenImage.open(title, link);
}
  popupOpenImage.setEventListeners();


//попап удаления карточки
const deleteConfirmPopup = new PopupWithConfirm(".popup__form_delete-card", {
    handleFormSubmit: () => {
    }
});
deleteConfirmPopup.setEventListeners();


//функция создания новых карточек, удаление и рабочий лайк
function createCard(title, link) {
  const card = new Card(title, link, "#card", {handleCardClick,
  handleCardDelSubmit: () => {
    deleteConfirmPopup.open(() => {
        deleteConfirmPopup.isLoading(true);
        api.deleteCard(data._id)
            .then(() => {
                card.deleteCard();
                deleteConfirmPopup.close();
            })
            .catch((err) => console.log(`Error with createCard handleCardDelSubmit` + err))
    });
    deleteConfirmPopup.open();
},
  handleAddLike: () => {
    api.addLike(data._id)
        .then(data => {
            card.isLiked = true;
            card.likeCounter.textContent = data.likes.length;
            card.likeButton.classList.toggle("element__heart_active")
        })
        .catch((err) => console.log(`Error with createCard handleAddLike` + err))
},
  handleDelLike: () => {
    api.deleteLike(data._id)
        .then(data => {
            card.isLiked = false;
            card.likeCounter.textContent = data.likes.length;
            card.likeButton.classList.toggle("element__heart_active")
        })
        .catch((err) => console.log(`Error with handleDelLike` + err))

      },
      currentUserId: userId
    });

  const cardElement = card.generateCard();
  return cardElement;
    }
//инициализируем класс, ответственный за добавление формы на страницу
const cardList = new Section(
  {
    items: initialCards,
    renderer: (title, link) => cardList.addItem(createCard(title, link))
  },
  ".elements"
);
cardList.renderItems();


//добавление карточки в контейнер
const newCard = new PopupWithForm(".popup-add", {
  handleFormSubmit: ({title, link}) => {
    newCard.isLoading(true);
    api.addCard({
      title: title,
      link: link
  })
  .then(() => {
    cardList.addItem(createCard(title, link));

  newCard.close();
  formElementAdd.reset();
})
.catch((err) => console.log(`Error with newCard` + err))
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
  handleFormSubmit: () => {
    newProfile.isLoading(true);
    api.editProfileInfo({
      name: nameInput.value,
      about: jobInput.value
    })
    .then((data) => {
      userInfo.setUserInfo({
          userName: data.name,
          userJob: data.about
      });
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
                  userName: data.name,
                  userJob: data.about,
                  userAvatar: data.avatar
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
            userName: user.name,
            userJob: user.about,
            userAvatar: user.avatar
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

