export class CalcStore {
  #firstNumber = '0';
  #secondNumber = '';
  #currentSymbol = '';
  #result = '0';
  #isReplace = false;

  getState() {
    return {
      firstNumber: this.#firstNumber,
      secondNumber: this.#secondNumber,
      currentSymbol: this.#currentSymbol,
      isReplace: this.#isReplace,
      result: this.#result,
    };
  }
  setState({ firstNumber, secondNumber, currentSymbol, isReplace, result }) {
    this.#firstNumber = firstNumber === undefined ? this.#firstNumber : firstNumber;
    this.#secondNumber = secondNumber === undefined ? this.#secondNumber : secondNumber;
    this.#currentSymbol = currentSymbol === undefined ? this.#currentSymbol : currentSymbol;
    this.#isReplace = isReplace || this.#isReplace;
    this.#result = result === undefined ? this.#result : result;
  }
  clearState() {
    this.#firstNumber = '0';
    this.#secondNumber = '';
    this.#currentSymbol = '';
    this.#result = '0';
  }
}
