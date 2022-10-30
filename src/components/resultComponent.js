import { CalcStore } from '../store/calcStore.js';
import { ServiceActions } from '../services/serviceActions.js';
import { CommonComponent } from './commonComponent.js';

export class ResultComponent extends CommonComponent {
  #store;
  #service;
  constructor(store, service) {
    super('.calc-screen span');
    if (store instanceof CalcStore) this.#store = store;
    if (service instanceof ServiceActions) this.#service = service;
  }
  #render() {
    this.getComponent().textContent = this.#store.getState().result;
  }
  calculate({ target }) {
    //if click no buttons
    if (!target.classList.contains('btn')) return;
    // click buttons
    if (target.classList.contains('ac')) return;
    if (target.classList.contains('replace')) return;

    this.#store.setState({ result: '' });
    this.#service.calculate(target.textContent);
    this.#render();
  }
  clearAll() {
    this.#store.clearState();
    this.#render();
  }
  replace() {
    this.#store.setState({ firstNumber: (this.#store.getState().firstNumber *= -'1'), isReplace: true });
  }
}
