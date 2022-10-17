//application development time ~ 29 hours
//problem
//5*5-2 not equals 23 (-2)

let firstNumber = '0';
let secondNumber = '';
let symbol = '';
let isReplace = false;
const result = document.querySelector('.calc-screen span');

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const actions = {
  ['+']: plus,
  ['-']: minus,
  ['X']: multiply,
  ['/']: division,
  ['%']: percent,
};

function clearAll() {
  firstNumber = '0';
  secondNumber = '';
  symbol = '';
  result.textContent = firstNumber;
  console.log('0');
}
//solve the dot problem!!!
function clickDot() {
  if (typeof firstNumber === 'string' && firstNumber.indexOf('.') < 0) {
    firstNumber += '.';
    result.textContent = firstNumber;
  } else if (secondNumber.indexOf('.') < 0 && secondNumber !== '') {
    secondNumber += '.';
    result.textContent = secondNumber;
  }
}

function plus(firstValue, secondValue) {
  firstNumber = Number(firstValue) + Number(secondValue);
  console.log(firstNumber);
  return firstNumber;
}
function minus(firstValue, secondValue) {
  if (firstNumber === '0') {
    firstNumber = '-';
    result.textContent = firstNumber;
    // return firstNumber;
  } else {
    firstNumber = firstValue - secondValue;
    console.log(firstNumber);
  }
  return firstNumber;
}
function multiply(firstValue, secondValue) {
  if (secondValue === '') {
    return firstNumber;
  } else if (firstValue === '0' || secondValue === '0') {
    firstNumber = '0';
    return firstNumber;
  }
  firstNumber = firstValue * secondValue;
  return firstNumber;
}
function division(firstValue, secondValue) {
  if (secondValue === '') {
    return firstNumber;
  } else if (firstValue === '0' || secondValue === '0') {
    firstNumber = '0';
    return firstNumber;
  }
  firstNumber = firstValue / secondValue;
  return firstNumber;
}
function percent(firstValue, secondValue) {
  if (secondValue === '') {
    return firstNumber;
  }
  firstNumber = (firstValue / 100) * secondValue;
  return firstNumber;
}
function replace() {
  isReplace = true;
  firstNumber *= -'1';
}
function equals() {
  if (isReplace) {
    result.textContent = firstNumber;
  } else {
    result.textContent = actions[symbol](firstNumber, secondNumber);
    console.log(firstNumber);
    symbol = '';
    secondNumber = '';
  }
}
const buttons = event => {
  //click no buttons
  if (!event.target.classList.contains('btn')) return;
  const key = event.target.textContent;
  //click buttons
  if (event.target.classList.contains('ac')) return;
  if (event.target.classList.contains('dot')) return;
  if (event.target.classList.contains('equals')) return;
  if (event.target.classList.contains('plus-minus')) return;

  result.textContent = '';
  //gate buttons

  if (digits.includes(key)) {
    //put the value in the first variable!!!
    if (secondNumber === '' && symbol === '') {
      //remove extra null!!!
      if (key > '0' && firstNumber === '0') {
        firstNumber = key;
        result.textContent = firstNumber;
      } else {
        firstNumber += key;
        if (firstNumber === '00') {
          firstNumber = '0';
        }
      }
      console.log(firstNumber);
      result.textContent = firstNumber;
    }
    //catch a minus in a number (first)!!!
    else if (firstNumber === '-') {
      firstNumber += key;
      symbol = '';
      result.textContent = firstNumber;
    }
    //feach multi plus (2+2+2+2)
    // bug!
    else if (firstNumber !== '' && secondNumber !== '' && symbol !== '') {
      secondNumber = key;
      result.textContent = secondNumber;
    }
    //put the value in the second number!!!
    else {
      secondNumber += key;
      result.textContent = secondNumber;
      console.log(secondNumber + 'sjhfd');
    }
    return;
  }
  //checking for symbols
  if (Object.keys(actions).includes(key)) {
    symbol = key;
    result.textContent = symbol;
    console.log(symbol);
    return actions[key](firstNumber, secondNumber);
  }
};
document.querySelector('.equals').onclick = equals;
document.querySelector('.ac').onclick = clearAll;
document.querySelector('.dot').onclick = clickDot;
document.querySelector('.plus-minus').onclick = replace;
document.querySelector('.buttons').onclick = buttons;
