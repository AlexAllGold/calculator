export class CommonComponent {
  #component;
  constructor(className) {
    this.#component = document.querySelector(className);
  }
  getComponent() {
    return this.#component;
  }
  //
  setClick(click) {
    this.#component.onclick = click;
  }
}
