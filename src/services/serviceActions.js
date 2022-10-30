import { CalcStore } from '../store/calcStore.js';

export class ServiceActions {
  #store;
  #actions;
  constructor(store) {
    if (store instanceof CalcStore) {
      this.#store = store;
    }
    this.#actions = {
      ['+']: this.#plus.bind(this),
      ['-']: this.#minus.bind(this),
      ['X']: this.#multiply.bind(this),
      ['/']: this.#division.bind(this),
      ['%']: this.#percent.bind(this),
    };
  }
  calculate(currentKey) {
    if (this.#isDigit(currentKey)) {
      this.#checkNumber(currentKey);
    } else if (this.#actions[currentKey]) {
      this.#checkAction(currentKey);
    } else if (this.#isDot(currentKey)) {
      this.#clickDot();
    } else if (this.#isEquals(currentKey)) {
      this.#equals();
    }
  }
  #plus(...theArgs) {
    const { firstNumber, secondNumber } = this.#store.getState();
    if (theArgs.length === 1) {
      return this.#store.setState({ result: firstNumber });
    } else {
      this.#store.setState({ firstNumber: Number(firstNumber) + Number(secondNumber), secondNumber: '' });
      return this.#store.setState({ result: this.#store.getState().firstNumber });
    }
  }
  #minus(...theArgs) {
    const { firstNumber, secondNumber } = this.#store.getState();
    if (firstNumber === '0') {
      this.#store.setState({ firstNumber: '-', result: firstNumber });
      return this.#store.getState().result;
    } else if (theArgs.length === 1) {
      return this.#store.getState().firstNumber;
    } else {
      this.#store.setState({ result: firstNumber - secondNumber, secondNumber: '' });
      return this.#store.getState().result;
    }
  }
  #multiply(...theArgs) {
    const { firstNumber, secondNumber } = this.#store.getState();
    if (theArgs.length === 1) {
      return this.#store.setState({ result: firstNumber });
    } else if (firstNumber === '0' || secondNumber === '0') {
      return this.#store.setState({ firstNumber: '0', result: '0' });
    } else {
      this.#store.setState({ firstNumber: firstNumber * secondNumber, secondNumber: '' });
      return this.#store.setState({ result: this.#store.getState().firstNumber });
    }
  }
  #division(...theArgs) {
    const { firstNumber, secondNumber } = this.#store.getState();
    if (theArgs.length === 1) {
      return this.#store.setState({ result: firstNumber });
    } else if (firstNumber === '0' || secondNumber === '0') {
      return this.#store.setState({ firstNumber: '0', result: '0' });
    } else {
      this.#store.setState({ firstNumber: firstNumber / secondNumber, secondNumber: '' });
      return this.#store.setState({ result: this.#store.getState().firstNumber });
    }
  }
  #percent(...theArgs) {
    const { firstNumber, secondNumber } = this.#store.getState();
    if (theArgs.length === 1) {
      return this.#store.setState({ result: firstNumber });
    }
    this.#store.setState({ firstNumber: (firstNumber / 100) * secondNumber });
    return this.#store.setState({ result: this.#store.getState().firstNumber });
  }
  #clickDot() {
    const { firstNumber, secondNumber } = this.#store.getState();
    if (String(firstNumber) && firstNumber.indexOf('.') < 0) {
      this.#store.setState({ firstNumber: firstNumber + '.' });
      return this.#store.setState({ result: this.#store.getState().firstNumber });
    } else if (String(secondNumber.indexOf('.')) < 0 && secondNumber !== '') {
      this.#store.setState({ secondNumber: secondNumber + '.' });
      return this.#store.setState({ result: this.#store.getState().secondNumber });
    }
  }
  #equals() {
    const { firstNumber, secondNumber, currentSymbol, isReplace } = this.#store.getState();
    if (isReplace || currentSymbol === '') {
      this.#store.setState({ result: firstNumber });
    } else if (secondNumber === '') {
      return this.#store.setState({ result: this.#actions[currentSymbol](firstNumber) });
    } else {
      const result = this.#actions[currentSymbol](firstNumber, secondNumber);
      this.#store.setState({ currentSymbol: '', secondNumber: '', firstNumber: result, result: result });
    }
  }
  #checkNumber(currentKey) {
    let currentResult = '';
    const { firstNumber, secondNumber, currentSymbol } = this.#store.getState();
    //put the value in the first variable
    if (!this.#isEmpty(secondNumber) && !this.#isEmpty(currentSymbol)) {
      //remove extra null
      if (currentKey > '0' && firstNumber === '0') {
        this.#store.setState({ firstNumber: currentKey });
      } else {
        this.#store.setState({ firstNumber: firstNumber + currentKey });
        if (this.#store.getState().firstNumber === '00') {
          this.#store.setState({ firstNumber: '0' });
        }
      }
      this.#store.setState({ result: this.#store.getState().firstNumber });
    }
    //catch a minus in a number (first)
    else if (firstNumber === '-') {
      currentResult = firstNumber + currentKey;
      this.#store.setState({ firstNumber: currentResult, result: currentResult, currentSymbol: '' });
    }
    //put the value in the second variable
    else {
      currentResult = secondNumber + currentKey;
      this.#store.setState({ secondNumber: currentResult, result: currentResult });
    }
  }
  #checkAction(currentKey) {
    //check for a symbols (actions)
    //always decides in first number
    const { firstNumber, secondNumber, currentSymbol } = this.#store.getState();
    if (this.#isEmpty(firstNumber) && this.#isEmpty(secondNumber) && this.#isEmpty(currentSymbol)) {
      const result = this.#actions[currentSymbol](firstNumber, secondNumber);
      this.#store.setState({
        firstNumber: result,
        currentSymbol: currentKey,
        result: result,
      });
      //check for is empty second number
    } else if (this.#isEmpty(secondNumber)) {
      const result = this.#actions[currentKey](firstNumber, secondNumber);
      this.#store.setState({ currentSymbol: currentKey, result });
    } else {
      const result = this.#actions[currentKey](firstNumber);
      this.#store.setState({ currentSymbol: currentKey, result });
    }
    this.#store.setState({ result: currentKey });
  }
  #isDigit = digit => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(digit);
  #isDot = dot => dot === '.';
  #isEquals = equals => equals === '=';
  #isEmpty = currentKey => currentKey !== '';
}
