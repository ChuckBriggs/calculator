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
		displayValue = 'error; div/0.';
		updateDisplay;
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
		if (displayValue[0] == '-') {
			displayValue = '0' + displayValue;
		}
		let operator = [];
		let operand = [];
		let index = 0;
		for (i = 0; i < displayValue.length; i++) {
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
					if (convertToNum(operand[i+1]) != 0) {
						let tempNum = operate('/', convertToNum(operand[i]), convertToNum(operand[i+1]));
						operand[i+1] = tempNum.toString();
						operator.splice(i, 1);
						operand.splice(i, 1);
						i = -1;
					} else {
						displayValue = 'div/0 error';
						updateDisplay();
						displayValue = '0';
						return;
					}
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
				if (operator[i] == '-') {
					let tempNum = operate('-', convertToNum(operand[i]), convertToNum(operand[i+1]));
					operand[i+1] = tempNum.toString();
					operator.splice(i, 1);
					operand.splice(i, 1);
					i = -1;
				}
			}
		}
		displayValue = operand[0];
		updateDisplay();
	}
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
document.querySelector('#btnCLR').addEventListener('click', clearAll);
document.querySelector('#btnDEL').addEventListener('click', deleteLast);
document.querySelector('#btnEQ').addEventListener('click', evaluateEquation);

window.addEventListener('keydown', e => {
	let btnPushed;
	switch(e.key) {
		case '0':
			btnPushed = document.getElementById('btn0');
			break;
		case '1':
			btnPushed = document.getElementById('btn1');
			break;
		case '2':
			btnPushed = document.getElementById('btn2');
			break;
		case '3':
			btnPushed = document.getElementById('btn3');
			break;
		case '4':
			btnPushed = document.getElementById('btn4');
			break;
		case '5':
			btnPushed = document.getElementById('btn5');
			break;
		case '6':
			btnPushed = document.getElementById('btn6');
			break;
		case '7':
			btnPushed = document.getElementById('btn7');
			break;
		case '8':
			btnPushed = document.getElementById('btn8');
			break;
		case '9':
			btnPushed = document.getElementById('btn9');
			break;
		case '1':
			btnPushed = document.getElementById('btn1');
			break;
		case '+':
			btnPushed = document.getElementById('btnPLUS');
			e.preventDefault();
			break;
		case '-':
			btnPushed = document.getElementById('btnMINUS');
			e.preventDefault();
			break;
		case '*':
			btnPushed = document.getElementById('btnTIMES');
			e.preventDefault();
			break;
		case '/':
			btnPushed = document.getElementById('btnDIV');
			e.preventDefault();
			break;
		case 'Enter':
		case '=':
			btnPushed = document.getElementById('btnEQ');
			e.preventDefault();
			break;
		case 'Escape':
			btnPushed = document.getElementById('btnCLR');
			e.preventDefault();
			break;
		case 'Backspace':
		case 'Delete':
			btnPushed = document.getElementById('btnDEL');
			e.preventDefault();
			break;
		default:
			break;
	}
	if (btnPushed) {
		btnPushed.click();
	}
});

updateDisplay();
