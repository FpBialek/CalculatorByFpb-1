const digits = document.querySelectorAll('.digits')
const action = document.querySelectorAll('.action')
const clear = document.querySelectorAll('.clear')
const deleteOne = document.querySelectorAll('.delete')
const score = document.querySelectorAll('.score2')
const prevScore = document.querySelectorAll('.prev-action')
const currScore = document.querySelectorAll('.curr-action')


let currAction = ''
let prevAction = ''
let actionOne = undefined

const doCalculate = () => {
    let calculateJob 
    if (!prevAction || !currAction) {
        return
    }

    const previous = parseFloat(prevAction)
    const current = parseFloat(currAction)
    if(isNaN(previous) || isNaN(current)){
        return
    }

switch (operation) {
    case '+':
        calculateJob  = previous + current
        break 
    case '-':
        calculateJob = previous - current
        break
    case '×':
        calculateJob = previous * current 
        break
    case '/':
        if(current === 0)
        {
            clearScore()
            return
        }
        calculateJob = previous / current
        break
    case '^':
        calculateJob = Math.pow(previous, current)
        break
    case '%':
        calculateJob = previous / 100 * current
        break
    case '√':
        calculateJob = Math.pow(previous, 1 / current)
        break
    case 'log':
        dzialanie = Math.log(poprzednie) / Math.log(aktualne)
        break 
    default :
    return
}

currAction = calculateJob
prevAction = ''
actionOne = undefined

}

const chooseOperation = (operator) => {
    if(currAction === ''){
        return
    }
    if(prevAction !== '') {
        const previous = prevScore.innerText
        if(currAction.toString() === '0' && previous[previous.length - 1] === '/'){
            clearScore()
            return
        }
        doCalculate()
    }
    operation = operator
    prevAction = currAction
    currAction = ''
}

const addNumber = (number) => {
    if(number === '•') {
        if(currAction.includes('.')){
            return
        }
        number = '.'
    }
    currAction = currAction.toString() + number.toString()
}

const deleteNumber = () => {
    currAction = currAction.toString().slice(0, -1)
}

const updateResult = () => {
    currScore.innerText = currAction
    if(operation != null) {
        prevScore.innerText = prevAction + operation 
    } else {
        prevScore.innerText = ''
    }
}

const clearScore = () => {
    currAction = ''
    operation = undefined
    prevAction = ''
}

digits.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResult()
    })
})

action.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperation(operator.innerText)
        updateResult()
    })
})

score.addEventListener('click', () => {
    doCalculate()
    updateResult()
})

deleteOne.addEventListener('click', () => {
    deleteNumber()
    updateResult()
})

clear.addEventListener('click', () => {
    clearScore()
    updateResult()
})