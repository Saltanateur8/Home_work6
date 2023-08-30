// PHONE VALIDATOR
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'YOUR NUMBER IS VALID!'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'YOUR NUMBER IS NOT VALID'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, i) => {
            if (event.target === item) {
                hideTabContent()
                showTabContent(i)
            }
        })
    }
}

// CONVERTER

// DRY - don`t repeat yourself
// KISS - keep it short and simple

const som = document.querySelector('#som')
const usd = document.querySelector('#usd')

const converter = (element, target, target2, isTrue) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open("GET", "../data/converter.json")
        request.setRequestHeader("Content-type", "application/json")
        request.send()

        request.onload = () => {
            const response = JSON.parse(request.response)
            if (isTrue) {
                target.value = (element.value / response.usd).toFixed(2)
            } else {
                target.value = (element.value * response.usd).toFixed(2)
            }
            element.value === '' && (target.value = '')
        }
    }
}

converter(som, usd, true)
converter(usd, som, false)


// // CARD SWITCHER
//
// const card = document.querySelector('.card')
// const btnPrev = document.querySelector('#btn-prev')
// const btnNext = document.querySelector('#btn-next')
// let count = 1
//
//
// btnNext.onclick = () => {
//     count++
//     fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
//         .then(response => response.json())
//         .then(data => {
//             card.innerHTML = `
//                 <p>${data.title}</p>
//                 <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
//                 <span>${data.id}</span>
//             `
//         })
// }

// CARD SWITCH

const prevButton =document.querySelector("#btn-prev")
const card = document.querySelector(".card")
const nextButton = document.querySelector("#btn-next")
let scope = 0

prevButton.onclick =fetchTodo
nextButton.onclick = fetchTodo
window.onload = fetchTodo


function handleSecureRequests(isRequested= false){
    prevButton.disabled = isRequested
    nextButton.disabled = isRequested
}

function fetchTodo (event){
    handleSecureRequests(true)

    if (event.target === prevButton) --scope
    else ++scope

    if (scope === 201){
        scope = 1
    }else if (scope === 0){
        scope = 200
    }


    fetch(`https://jsonplaceholder.typicode.com/todos/${scope}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
`
        }).finally(handleSecureRequests)
}