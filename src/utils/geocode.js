const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGVqYW1hbmRhIiwiYSI6ImNqenRteXhkbDAyMDgzY2wyendpdW03MHkifQ.zFmtIGm36RA2FsK9JG0Dug'
    request({ url, json:true}, (error, { body }) =>{ //Using shorthand syntax for url and destructuring response object to get only body property
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode