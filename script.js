class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    
    percent() {
        let percent = this.currentOperand / 100;
        this.currentOperand = percent; 
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.currentOperand !== "" && this.previousOperand !== "") this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation)  {

        case "+":
            computation = +(prev + current).toFixed(8);
        break;

        case "-":
            computation = +(prev - current).toFixed(8);
        break;

        case "*":
            computation = +(prev * current).toFixed(8);
        break;

        case "÷":
            if(current === 0) {
                computation = "You can't divide by 0. It's undefined :("
            } else {
                computation = +(prev / current).toFixed(8);
            }
        
        case "/":
            if(current === 0) {
                computation = "You can't divide by 0. It's undefined :("
            } else {
                computation = +(prev / current).toFixed(8);
            }
        break;

        default:
            return;
        }

        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = "";
        }

    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const percentButton = document.querySelector('[data-percent]');
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(calculator.previousOperand === "" &&
        calculator.currentOperand !== "" &&
        calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})

percentButton.addEventListener("click", () => {
    calculator.percent();
    calculator.updateDisplay();
})


//Keyboard support

window.addEventListener('keydown', (event) => {

    if((event.key).match("^[0-9,.]")) {
        calculator.appendNumber(+event.key);
        calculator.updateDisplay();
    } else if ((event.key).match("[+,*,/,-]")) {
        calculator.chooseOperation(event.key)
        calculator.updateDisplay();
    } else if ((event.key).match("Enter")) {
        calculator.compute();
        calculator.updateDisplay();
    } else if ((event.key).match("Backspace")) {
        calculator.delete();
        calculator.updateDisplay();
    } else if ((event.key).match("%")) {
        calculator.percent();
        calculator.updateDisplay();
    } else if ((event.key).match("Escape")) {
        calculator.clear();
        calculator.updateDisplay();
    }

})


