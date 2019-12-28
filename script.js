let displayValue = '1234567890';

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
