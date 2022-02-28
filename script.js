const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

let dummyTransactions =  [
    {id: 1, name: 'Bolo de Chocolate', amount: -20},
    {id: 2, name: 'Salário', amount: 2300},
    {id: 3, name: 'Paté', amount: -6},
    {id: 4, name: 'Cloud', amount: -24},
    {id: 5, name: 'Bike Itaú', amount: -36},
    {id: 6, name: 'Polatto.tec', amount: 750}
]

const removeTransection = ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
    console.log(dummyTransactions)
    init()
}

const addTransactionIntoDOM =  transaction  => {

    const operator = transaction.amount <  0 ? '-' : '+'
    const CSSClass = transaction.amount <  0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)

    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name}
        <span>${operator}${amountWithoutOperator}</span>
        <button class="delete-btn" onclick="removeTransection(${transaction.id})">
            x
        </button>
    `
    transactionsUl.append(li)
}

const updateBalanceValues = () => {
    const transactionAmount = dummyTransactions.map( transaction => transaction.amount)

    const total = transactionAmount
        .reduce((accumulator, transaction) => accumulator + transaction)
        .toFixed(2)

    const income = transactionAmount
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)

    const expese = transactionAmount
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expese}`

    // console.log(total)
    // console.log(income)
    // console.log(expese)
    // console.log(transactionAmount
}

const init = () => {
    transactionsUl.innerHTML = ''
    dummyTransactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const generateID = () => Math.random(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionAmount === '') {
        alert('O prenchimento dos campos é necessário')
        return
    }

    const transaction = {
        id: generateID, 
        name: transactionName, 
        amount: Number(transactionAmount)
    }

    dummyTransactions.push(transaction)

    init()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''

    console.log(transaction)
})