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
  profileAvatarEditButton,
} from "../utils/constants.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "8588e445-30d5-4411-adda-61192e2bff2f",
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


const deleteConfirmPopup = new PopupWithConfirm(".popup_element_delete-card", {
    handleFormSubmit: () => {
    }
});


//функция создания новых карточек, удаление и рабочий лайк
function createCard(title, link) {
  const card = new Card(title, link, "#card", {handleCardClick,
  handleCardDelSubmit: () => {
    deleteConfirmPopup.submitConfirm(() => {
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

      }});

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
      name: info.PlaceName,
      link: info.PlaceImage
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
      //popupEditAvatar.isLoading(true);
      api.setAvatar({
          avatar: info.AvatarImage
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
