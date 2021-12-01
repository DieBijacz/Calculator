
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }
    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand
            .toString()
            .slice(0, -1)
    }
    appendNumber(number) {
        // prevent from adding more then one "."
        if(number === '.' && this.currentOperand.includes('.')) return
        //stringify number and join to number
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '')return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    compute() {
        let result
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        //check if Not a Number then stop here
        if(isNaN(prev) || isNaN(curr))return
        switch (this.operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '&#247;':
                result = prev / curr
                break
            default:
                return
        }   
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number) {
        //change number to string
        const stringNumber = number.toString()

        //split stringNumber to [[integerDigits] . [decimalDigits]]
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

    }
    updateDispaly() {
        this.currentOperandElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-all-clear]')
const previousOperandElement = document.querySelector('[data-previous-operand]')
const currentOperandElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandElement, currentOperandElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDispaly()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDispaly()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDispaly()
})
clearAllButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDispaly()
})
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDispaly()
})