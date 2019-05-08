const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/dded91842a0ac62b235aa8ce67d33005/${latitude},${longitude}`
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const currently = body.currently
            console.log(body.currently)
            callback(undefined, `
                ${body.daily.data[0].summary}
                It's currently ${currently.temperature} degrees out.
                The highest temperature will be ${body.daily.data[0].temperatureMax}°F
                and the lowest temperature will be ${body.daily.data[0].temperatureMin}°F.
                There is a ${currently.precipProbability}% chance of rain.
                `)
        }
    })
}

module.exports = forecast
