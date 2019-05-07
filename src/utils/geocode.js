const request = require('request')

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoidGhlcmVnZ2UiLCJhIjoiY2o4b3RrN2Z4MDhjejJ3bWtpYmR3OW8xdSJ9.MCd5Ynd3cs1FPIH72zh2Sw&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if ( body.features.length === 0) {
            callback('Unable to find location. Try another search')
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
