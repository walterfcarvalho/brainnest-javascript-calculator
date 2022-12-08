let mainOperation = null;
let mainResult = null;
let isNewOperation = true;


document.addEventListener('keyup', (event) =>{ 
  let  values = {
    '+': () => setOperation(event.key),
    '-': () => setOperation(event.key),
    '*': () => setOperation(event.key),
    '/': () => setOperation(event.key), 
    ',': () => addKey(','),
    '%': () => divideBy100(),
    'Escape': () => clearDisplay()
  }

  if (event.key >= '0' && event.key <='9')
    addKey(event.key);
  else if (values[event.key] != undefined)
    values[event.key]()
  else if (event.key == '–' && event.altKey )
    tooglePositive()
})


const updateDisplay = (value) => {
  document.getElementById('value-display').innerText = 
  value.slice(0, 10).replace('.', ',');
}


const clearDisplay = () => {
  console.clear();
  mainOperation = null;
  mainResult = null;
  isNewOperation = true;
  updateDisplay('0');
  markSelectOperation(null);
}


const tooglePositive = () => {
  let aux = displayToValue() * -1;

  updateDisplay('0');
  addKey(aux.toString());
  isNewOperation = true;
}


const divideBy100 = () => {
  let aux = + displayToValue() /100;
  updateDisplay(aux.toString());
}


const displayToValue = () => parseFloat(
  (document.getElementById('value-display').innerText).replace(',','.')
)


const valueToDisplay = (value) => ('' + value).replace('.',',');


const addKey = (value) => {
  let aux = document.getElementById('value-display').innerText;
  
  if (isNewOperation == true) {
    aux = ''
    isNewOperation = false;
  }

  aux += (aux.includes(',') && value == ',') ? '' : value;

  if (aux !== '0' && aux !== '0,' )
    if (!aux.includes(',') && aux[0] == '0')
      aux = aux.slice(1)

  updateDisplay(aux);
}


const calculate = (nextNumber) => {
  let aux = 0;

  let operations = {
    '+': () => mainResult + nextNumber,
    '-': () => mainResult - nextNumber,
    '*': () => mainResult * nextNumber,
    '/': () => mainResult / nextNumber
  }

  aux = (operations[mainOperation])()

  // console.log('calculate():  operacao:', mainOperation, 'valorAnterior:', mainResult, 'nextValue:', nextNumber, 'mainResult:', aux);
  return aux;
}

const setOperation = (event, operator) => {
  let value = displayToValue();

  if (mainResult == null) {    
    mainOperation = operator;
    mainResult = value;

  } else {
    mainResult = calculate(value);
    mainOperation = operator;
    updateDisplay('0');
    addKey(mainResult.toString());
  }
  isNewOperation = true;
  markSelectOperation(event.target.id, operator)
}

const markSelectOperation = (id) => {
  ['+', '-', '*', '/'].forEach( 
    item => document.getElementById(item).classList.remove('select-operation') 
  )

  if (id !== null) 
    document.getElementById(id).classList.add('select-operation')
}
