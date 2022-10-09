let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['1','2','3','4','5','6','7','8','9','0','.'];
const action = ['+','-','X','/', '%', '+/-'];

const out = document.querySelector('.calc-screen span');

function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = a;
    console.log('0');
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    //click no buttons
    if(!event.target.classList.contains('btn')) return;
    //click buttons
    if(event.target.classList.contains('ac')) return;

    out.textContent = '';
    //gate buttons
    const key = event.target.textContent;

    if(digit.includes(key)) {
        if(b === '' && sign === '') {
                a += key;
                out.textContent = a;
        }
        else if(a === '' && sign === '-') {
                a += key;
                a = sign + a;
                sign = '';
            out.textContent = a;
        }
        else if(a !== '' && sign !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.log(a, sign, b);
        return;
    }
    if(action.includes(key)){
        sign = key;
        console.log(a, sign, b);
        out.textContent = sign;
        return;
    }
    if(key === '='){
        if(b === ''){
            b = a;
        }
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if(b === '0'){
                    a = '0';
                    break;
                }
                a = a / b;
                break;
            case "%":
                a = a / 100 * b;
                break;
            case "+/-":
                a *= - '1';
                break;
        }
        finish = true;
        console.log(a);
        out.textContent = a;
    }
}