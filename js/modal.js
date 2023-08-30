// MODAL

const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModalButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = () => openModal()
closeModalButton.onclick = () => closeModal()
// setTimeout(openModal, 10000)
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

const scrollHandler = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal()
        window.removeEventListener('scroll', scrollHandler)
    }
}

window.addEventListener('scroll', scrollHandler)

// POST DATA

const form = document.querySelector('form')


const postData = (url, dataJson) => {
    const response = fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: dataJson
    })
    return response
}

const bindPostData = (form) => {
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const obj = {}
        formData.forEach((item, i) => {
            obj[i] = item
        })
        const json = JSON.stringify(obj)
        if (window.location.pathname === '/project_program_for_students/index.html') {
            postData('server.php', json)
        } else {
            postData('../server.php', json)
        }

        fetchPosts()
    }
}

bindPostData(form)

//  Отдельный fetch запрос на ссылку | Вызывается при отправке запрос на "Перезвонить мне"
const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(r => r.json())
        .then(ress => console.log(ress))
}