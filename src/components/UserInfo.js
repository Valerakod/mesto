export default class UserInfo {
  constructor({ userName, userAbout }) {
    this._name = userName;
    this._about = userAbout
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo({ name, about }) {
    if (name) {
      this._name.textContent = name
    }
    if (about) {
      this._about.textContent = about
    }

  }
}
