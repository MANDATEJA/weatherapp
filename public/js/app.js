//console.log('Client side JS file loaded')

const weatherForm = document.querySelector('form')
const getlocation = document.querySelector('#get-location')
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

    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error
            }

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
        })
    })
})

getlocation.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = 'Loading!!!!'
    messageTwo.textContent = ''

    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        let position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }

        // Make REST call to new API for forecat information.
    })
})