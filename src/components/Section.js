export default class Section {
  constructor({ renderer }, containerSelector) {

    this._renderer = renderer;
    this._container = document.querySelector(containerSelector)
  };


  //setItemAppend(item) {
    //this._container.append(item);
  //}

  renderItems(items) {
    //setItemAppen();
    items.forEach(item => {
      this._renderer(item)
    })
  };

  addItem(element) {
    this._container.prepend(element);
  };
}
