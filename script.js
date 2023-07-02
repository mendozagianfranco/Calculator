/* Variables */
let display = document.querySelector('.screen');
let numbers = document.querySelectorAll('.number');
let clearButton = document.querySelector('.clear');
let operators = document.querySelectorAll('.operator');
let equal = document.querySelector('.equal');
let comma = document.querySelector('.comma')
let backspace = document.querySelector('.backspace')
let firstNumber;
let secondNumber;
let operator;
let result;
let clickOperator;

/* All the numbers on the calculator */
numbers.forEach((number) => {
    number.addEventListener('click', showNumbersOnDisplay);
});

/* Clear button */
clearButton.addEventListener('click', () => {
    display.textContent = '0';
    firstNumber = 0;
    secondNumber = 0;
});

/* Backspace button */
backspace.addEventListener('click', () => {
    if (display.textContent[0] == '0') return

    let number = display.textContent
    let newNumber = number.slice(0, -1);
    if (newNumber.length == 0) {
        display.textContent = '0'
        secondNumber = newNumber
    } else {
        display.textContent = newNumber
        secondNumber = newNumber
    }

})

/* It catches the operator clicking */
operators.forEach((operator) => {
    operator.addEventListener('click', getOperator)
});

/* shows the result of the operation */
equal.addEventListener(
    'click', () => {
        operate(operator, firstNumber, secondNumber)
    }
);

/* Takes the operator as a string */
function getOperator() {
    clickOperator = true
    if (!secondNumber) {
        secondNumber = 0;
    }

    if (firstNumber && secondNumber) {
        firstNumber = operate(operator, firstNumber, secondNumber)
    } else {
        firstNumber = secondNumber
    }
    operator = this.textContent;
}


/* shows the numbers on the calculator display */
function showNumbersOnDisplay(e) {

    //It only cleans the screen after a number has been clicked or if zero is clicked as the first number it does not write anything
    //Even if it is NaN cleans to prevent it from making calculations with NaN
    if (display.textContent[0] == '0' || clickOperator || display.textContent == NaN) {
        display.textContent = '';
        clickOperator = false
    }

    if (display.textContent.includes(".")) {
        comma.disabled = true;
    } else {
        comma.disabled = false;
    }

    if (display.textContent.length < 10) {
        let number = document.createTextNode(e.target.textContent);
        display.appendChild(number);
    } else {
        return
    }
    secondNumber = display.textContent;


}

/* Takes an operator and 2 numbers and then calls one of the above functions on the numbers */
function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+':
            return addition(firstNumber, secondNumber);
        case '-':
            return subtraction(firstNumber, secondNumber);
        case '*':
            return multiplication(firstNumber, secondNumber);
        case '/':
            return division(firstNumber, secondNumber);
    }
}


/* The functions of the various operations */
/* 
    firstNumber = undefined
    It serves to avoid an unexpected calculation when trying to press an operator after having obtained the result by equals
*/
function addition(a, b) {
    secondNumber = +a + +b
    firstNumber = undefined
    return display.textContent = secondNumber;
}

function subtraction(a, b) {
    secondNumber = a - b
    firstNumber = undefined

    return display.textContent = secondNumber;
}

function multiplication(a, b) {
    secondNumber = a * b
    firstNumber = undefined
    //Added limit when number is too large writes it in scientific notation (exponential notation)
    if (secondNumber.toString().length > 7) {
        return display.textContent = secondNumber.toExponential(5)
    } else {

        return display.textContent = secondNumber;
    }

}

function division(a, b) {
    secondNumber = a / b
    firstNumber = undefined
    if (secondNumber.toString().length > 7) {
        return display.textContent = secondNumber.toFixed(7)
    } else {
        return display.textContent = secondNumber;
    }
}
