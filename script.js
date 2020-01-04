let displayValue = '0';

const display = document.querySelector('#calcDisplay');

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b) {
		return a / b;
	} else {
		console.log('The universe implodes.');
	}
}

function operate(operator, a, b) {
	switch(operator) {
		case '+':
			return add(a,b);
			break;
		case '-':
			return subtract(a,b);
			break;
		case '*':
			return multiply(a,b);
			break;
		case '/':
			return divide(a,b);
			break;
		default:
			console.log('Sorry, we are out of ' + operator + '.');
	}
}

function updateDisplay() {
	display.textContent = displayValue;
}

function addToDisplay(e) {
	if (displayValue == '0') {
		displayValue = '';
	}
	displayValue += this.value;
	updateDisplay();
}

function checkValidity(e) {
	let a = displayValue.slice(-1);
	if (a >= '0' && a <='9') {
		if (this.value === '.') {
			for (i = -1; a >= '0' && a <= '9'; i--) {
				a = displayValue.slice(i-1, i);
			}
			if (a != '.') {
				displayValue += this.value;
			}
		} else {
			displayValue += this.value;
		}
	}
	updateDisplay();
}

function clearAll() {
	displayValue = '0';
	updateDisplay();
}

function deleteLast() {
	if (displayValue.length > 1) {
		displayValue = displayValue.slice(0, -1);
	} else {
		displayValue = 0;
	}
	updateDisplay();
}

function convertToNum(string) {
	for (j = 0; j < string.length; j++) {
		if (string[j] === '.') {
			return parseFloat(string);
		}
	}
	return parseInt(string);
}

function evaluateEquation() {
	let a = displayValue.slice(-1);

	if (a >= '0' && a <= '9') {
		let operator = [];
		let operand = [];
		let index = 0;
		for (i = 0; i < displayValue.length; i++) {
			console.log(displayValue[i]);
			if (displayValue[i] >= '0' && displayValue[i] <= '9' || displayValue[i] == '.') {
				if (operand[index]) {
					operand[index] += displayValue[i];
				} else {
					operand[index] = displayValue[i];
				}
			} else {
				operator[index] = displayValue[i];
				index++;
			}
		}
		while (operator[0]) {
			for (i = 0; i < operator.length; i++) {
				if (operator[i] == '\xd7') {
					let tempNum = operate('*', convertToNum(operand[i]), convertToNum(operand[i+1]));
					operand[i+1] = tempNum.toString();
					operator.splice(i, 1);
					operand.splice(i, 1);
					i = -1;
				}
				if (operator[i] == '/') {
					let tempNum = operate('/', convertToNum(operand[i]), convertToNum(operand[i+1]));
					operand[i+1] = tempNum.toString();
					operator.splice(i, 1);
					operand.splice(i, 1);
					i = -1;
				}
			}
			for (i = 0; i < operator.length; i++) {
				if (operator[i] == '+') {
					let tempNum = operate('+', convertToNum(operand[i]), convertToNum(operand[i+1]));
					operand[i+1] = tempNum.toString();
					operator.splice(i, 1);
					operand.splice(i, 1);
					i = -1;
				}
				if (operator[i] == '\u2212') {
					let tempNum = operate('-', convertToNum(operand[i]), convertToNum(operand[i+1]));
					operand[i+1] = tempNum.toString();
					operator.splice(i, 1);
					operand.splice(i, 1);
					i = -1;
				}
			}
		}
		//fix hanging when working with negative output
		displayValue = operand[0];
		updateDisplay();
		console.log(operand);
		console.log(operator);
	} else {
		console.log('no eval');
	}
console.log('testing123');
//					console.log('operand[i]:');
//					console.log(operand[i]);
//					console.log('toNum operand[i]:');
//					console.log(convertToNum(operand[i]));
//					console.log('operand[i+1]:');
//					console.log(operand[i+1]);
//					console.log('toNum operand[i+1]:');
//					console.log(convertToNum(operand[i+1]));
//					console.log('tempNum:');
//					console.log(tempNum);

	//c check if last character is number
	// check if there are operators
	// if there are mult or div operators, do them
	// if there are add or sub operators, do them 

	updateDisplay();
}

const numBtns = document.querySelectorAll('.numBtn');
numBtns.forEach(button =>{
	button.addEventListener('click', addToDisplay);
})
const funcBtns = document.querySelectorAll('.funcBtn');
funcBtns.forEach(button =>{
	button.addEventListener('click', checkValidity);
})
document.querySelector('#clearBtn').addEventListener('click', clearAll);
document.querySelector('#deleteBtn').addEventListener('click', deleteLast);
document.querySelector('#eqBtn').addEventListener('click', evaluateEquation);

updateDisplay();
