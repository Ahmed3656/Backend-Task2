const request = require("request")

const weather = (address, callback) =>{
    const Url = "https://api.weatherapi.com/v1/current.json?key=31b6c1c9bb4341c4b61112030241803&q=" + address + "&aqi=no"

    request({url:Url, json:true}, (error, response)=>{
        if(error) {
            callback('Unable to cennect to server', undefined)
        }
        else if(response.body.message) {
            callback(response.body.message, undefined)
        }
        else if(!response.body.location) {
            callback("Your search is invalid", undefined)
        }
        else {
            callback(undefined, {
                capital:response.body.location.name,
                condition:response.body.current.condition.text,
                latitude:response.body.location.lat,
                longitude:response.body.location.lon
            })
        }
    })
}

module.exports = weather