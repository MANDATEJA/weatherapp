console.log('Client side JS file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()//Prevents the entire page from reloading

    messageOne.textContent = 'Loading!!!!'
    messageTwo.textContent = ''

    const location = search.value
    //console.log(location)

    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error
            }

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
        })
    })
})