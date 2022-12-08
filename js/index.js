let mainOperation = null;
let mainResult = null;
let isNewOperation = true;


document.addEventListener("click", (e) => {
  console.log(e.target.innerText);
})

const updateDisplay = (value) => {
  document.getElementById("value-display").innerText = value.slice(0, 10).replace(".", ",");
}

const clearDisplay = () => {
  console.clear();
  mainOperation = null;
  mainResult = null;
  isNewOperation = true;
  updateDisplay("0");
}

const tooglePositive = () => {
  let aux = displayToValue() * -1;

  updateDisplay("0");
  addKey(aux.toString());
  isNewOperation = true;
}
const divideBy100 = () => {
  let aux = + displayToValue() /100;
  updateDisplay(aux.toString());
}

const displayToValue = () => parseFloat(
  (document.getElementById("value-display").innerText).replace(",",".")
)
const valueToDisplay = (value) => ("" + value).replace(".",",");

const addKey = (value) => {

  let aux = document.getElementById("value-display").innerText;
  
  if (isNewOperation == true) {
    aux = ""
    isNewOperation = false;
  }

  aux += (aux.includes(',') && value == ',') ? "" : value;

  if (aux !== '0' && aux !== '0,' )
    if (!aux.includes(",") && aux[0] == "0")
      aux = aux.slice(1)

  updateDisplay(aux);
}

const calculate = (nextNumber) => {
  let aux = 0;

  switch (mainOperation) {
    case "+" : {
      aux = mainResult + nextNumber;
      break
    }
    case "-" : {
      aux = mainResult - nextNumber
      break
    }
    case "*" : {
      aux = mainResult * nextNumber
      break
    }
    case "/" : {
      aux = mainResult / nextNumber
      break
    }
  }
  console.log('calculate():  operacao:', mainOperation, "valorAnterior:", mainResult, "nextValue:", nextNumber, "mainResult:", aux);
  return aux;
}


const setOperation = (operator) => {
  let value = displayToValue();

  if (mainResult == null) {    
    mainOperation = operator;
    mainResult = value;

  } else {
    mainResult = calculate(value);
    mainOperation = operator;
    updateDisplay("0");
    addKey(mainResult.toString());
  }
  isNewOperation = true;
}