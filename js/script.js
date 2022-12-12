class JsCalc {
  constructor(prevOpTextElement, currOpHmtlElement) {
    this.prevOpTextElement = prevOpTextElement;
    this.currOpHmtlElement = currOpHmtlElement;
    this.clear();
  }

  clear() {
    this.currentOp = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOp.includes('.')) 
      return

    this.currentOp = this.currentOp.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOp === '') 
      return

    if (this.previousOperand !== '') {
      this.compute();
    }
    
    this.operation = operation;
    this.previousOperand = this.currentOp;
    this.currentOp = '';
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOp);
    
    if (isNaN(prev) || isNaN(current)) 
      return
    
    let opcs = {
      '+': () => prev + current,
      '-': () => prev - current,
      '*': () => prev * current,
      '/': () => prev / current
    }
    this.currentOp = opcs[this.operation]();
    this.operation = undefined;
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currOpHmtlElement.innerText = (this.getDisplayNumber(this.currentOp)).slice(0,10) + " "

    if (this.operation != null) {
      this.prevOpTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.prevOpTextElement.innerText = ''
    }
  }

  tooglePositive() {
    let aux = parseFloat(this.currentOp) * -1;
    this.currentOp = aux.toString();
    this.updateDisplay();
  }

  setPercent() {
    let aux = parseFloat(this.currentOp) / 100;
    
    aux = (aux > 0) 
      ? aux.toString().slice(0,11)
      : aux.toString().slice(0,12)

    this.currentOp = aux;
    this.updateDisplay();
  }
}

const numberButtons = document.querySelectorAll('.numbers');
const operationButtons = document.querySelectorAll('.operation');
const equalsBtn = document.querySelector('.opEquals');
const percentBtn = document.querySelector('.opPercent');
const allClearButton = document.querySelector('.AC');
const tooglePositiveBtn = document.querySelector('.tooglePositive');
const prevOpTextElement = document.querySelector('.previous-operand');
const currOpHmtlElement = document.querySelector('.current-operand');

const jsCalc = new JsCalc(prevOpTextElement, currOpHmtlElement);

numberButtons.forEach( btn => {
  btn.addEventListener('click', () => {
    if ( Math.abs(jsCalc.currentOp).toString().length >= 9)
      return
    
    jsCalc.appendNumber(btn.innerText)
    jsCalc.updateDisplay()
  })
})

operationButtons.forEach( btn => {
  btn.addEventListener('click', () => {
    jsCalc.chooseOperation(btn.innerText);
    jsCalc.updateDisplay();
  })
})

tooglePositiveBtn.addEventListener('click', btn => {
  btn.preventDefault();
  jsCalc.tooglePositive();
})

percentBtn.addEventListener('click', btn => {
  btn.preventDefault();
  jsCalc.setPercent();
})

equalsBtn.addEventListener('click', btn => {
  jsCalc.compute();
  jsCalc.updateDisplay();
})

allClearButton.addEventListener('click', btn => {
  jsCalc.clear();
  jsCalc.updateDisplay();
})

document.addEventListener('keydown', event => {
  let regOperators = /[+\-*\/]/g
  let regNumbers = /[0-9]/g;
  if (event.key.match(regNumbers)) {
    event.preventDefault();
    jsCalc.appendNumber(event.key);
    jsCalc.updateDisplay();
  }
  if (event.key === '.') {
    event.preventDefault();
    jsCalc.appendNumber(event.key);
    jsCalc.updateDisplay();
  }
  if (event.key.match(regOperators)) {
    event.preventDefault();
    jsCalc.chooseOperation(event.key);
    jsCalc.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    jsCalc.compute();
    jsCalc.updateDisplay();
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    jsCalc.delete();
    jsCalc.updateDisplay();
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    jsCalc.clear();
    jsCalc.updateDisplay()
  }

  if (event.dkey == 'Escape') {
    event.preventDefault();
    jsCalc.clear();
    jsCalc.updateDisplay()
  }

});