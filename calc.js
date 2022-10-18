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
function plus() {
  if (arguments.length === 1) {
    console.log(firstNumber);
    return firstNumber;
  } else {
    firstNumber = Number(firstNumber) + Number(secondNumber);
    console.log(firstNumber);
    secondNumber = '';
    return firstNumber;
  }
}
function minus() {
  if (firstNumber === '0') {
    firstNumber = '-';
    result.textContent = firstNumber;
  } else if (arguments.length === 1) {
    return firstNumber;
  } else {
    firstNumber = firstNumber - secondNumber;
    secondNumber = '';
    console.log(firstNumber);
    return firstNumber;
  }
}
function multiply() {
  if (arguments.length === 1) {
    return firstNumber;
  } else if (firstNumber === '0' || secondNumber === '0') {
    firstNumber = '0';
    return firstNumber;
  }
  firstNumber = firstNumber * secondNumber;
  secondNumber = '';
  console.log('E');
  return firstNumber;
}
function division() {
  if (arguments.length === 1) {
    return firstNumber;
  } else if (firstNumber === '0' || secondNumber === '0') {
    firstNumber = '0';
    return firstNumber;
  }
  firstNumber = firstNumber / secondNumber;
  secondNumber = '';
  return firstNumber;
}
function percent() {
  if (arguments.length === 1) {
    return firstNumber;
  }
  firstNumber = (firstNumber / 100) * secondNumber;
  return firstNumber;
}
function replace() {
  isReplace = true;
  firstNumber *= -'1';
}
function equals() {
  if (isReplace || symbol === '') {
    result.textContent = firstNumber;
  } else if (secondNumber === '') {
    result.textContent = actions[symbol](firstNumber);
  } else {
    result.textContent = actions[symbol](firstNumber, secondNumber);
    console.log(firstNumber + 'equals');
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
    // bug!
    // else if (firstNumber !== '' && secondNumber === '' && symbol !== '') {
    //   secondNumber = key;
    //   result.textContent = secondNumber;
    // }
    //put the value in the second number!!!
    else {
      secondNumber += key;
      result.textContent = secondNumber;
      console.log(secondNumber);
    }
    return;
  }
  //checking for symbols
  if (Object.keys(actions).includes(key)) {
    result.textContent = key;
    console.log(symbol);
    if (firstNumber !== '' && secondNumber !== '' && symbol !== '') {
      firstNumber = actions[symbol](firstNumber, secondNumber);
      symbol = key;
    } else if (secondNumber !== '') {
      symbol = key;
      return actions[key](firstNumber, secondNumber);
    } else {
      symbol = key;
      return actions[key](firstNumber);
    }
  }
};
document.querySelector('.equals').onclick = equals;
document.querySelector('.ac').onclick = clearAll;
document.querySelector('.dot').onclick = clickDot;
document.querySelector('.plus-minus').onclick = replace;
document.querySelector('.buttons').onclick = buttons;
