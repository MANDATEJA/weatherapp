const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/460e055745ac2280a5a7a3809633a17a/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true}, (error, { body }) => { //Using shorthand syntax for url and destructuring response object to get only body property
        if(error) {
            callback('Unbable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees.There is ' + body.currently.precipProbability + '% chance of raining')
        }
    })
}

module.exports = forecast