class JsCalc {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case ('/'):
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
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
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand) + " "
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }

  tooglePositive() {
    let aux = parseFloat(this.currentOperand) * -1;
    this.currentOperand = aux.toString();
    this.updateDisplay();
  }

  setPercent() {
    let aux = parseFloat(this.currentOperand) / 100;
    this.currentOperand = aux.toString();
    this.updateDisplay();
  }
}

const numberButtons = document.querySelectorAll('.numbers');
const operationButtons = document.querySelectorAll('.operation');
const equalsBtn = document.querySelector('.opEquals');
const percentBtn = document.querySelector('.opPercent');
const allClearButton = document.querySelector('.AC');
const tooglePositiveBtn = document.querySelector('.tooglePositive');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

const jsCalc = new JsCalc(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {

    if ( Math.abs(jsCalc.currentOperand).toString().length >= 9)
      return
    
    jsCalc.appendNumber(button.innerText)
    jsCalc.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    jsCalc.chooseOperation(button.innerText)
    jsCalc.updateDisplay()
  })
})

tooglePositiveBtn.addEventListener('click', btn =>{
  btn.preventDefault();
  jsCalc.tooglePositive()
})

percentBtn.addEventListener('click', btn =>{
  btn.preventDefault();
  jsCalc.setPercent()
})

equalsBtn.addEventListener('click', btn => {
  jsCalc.compute()
  jsCalc.updateDisplay()
})

allClearButton.addEventListener('click', btn => {
  jsCalc.clear()
  jsCalc.updateDisplay()
})

document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    jsCalc.appendNumber(event.key)
    jsCalc.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    jsCalc.appendNumber(event.key)
    jsCalc.updateDisplay()
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    jsCalc.chooseOperation(event.key)
    jsCalc.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    jsCalc.compute()
    jsCalc.updateDisplay()
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    jsCalc.delete()
    jsCalc.updateDisplay()
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    jsCalc.clear()
    jsCalc.updateDisplay()
  }

  if (event.dkey == 'Escape') {
    event.preventDefault();
    jsCalc.clear()
    jsCalc.updateDisplay()
  }

});