export default class UserInfo {
  constructor({ userName, userAbout, userAvatar }) {
    this._name = userName;
    this._about = userAbout;
    this._avatar = userAvatar
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._name.textContent = name
    }
    if (about) {
      this._about.textContent = about
    }
    if (avatar) {
      this._avatar.src = avatar
    }

  }
}
