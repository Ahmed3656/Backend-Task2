const form = document.querySelector('#weather-form')
const address = document.querySelector('#address')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherFn();
    form.reset(); 
})

const capital = document.querySelector("#capital")
const condition = document.querySelector("#condition")
const latLon = document.querySelector("#latlon")
const errorP = document.querySelector("#error")

const weatherFn = async ()=>{
    try {
        const address = document.querySelector('#address')
        const res = await fetch('http://localhost:3000/weather?address='+address.value)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorP.innerHTML = data.error
            capital.innerHTML = ""
            condition.innerHTML = ""
            latLon.innerHTML = ""
        }
        else {
            capital.innerHTML = "";
            condition.innerHTML = "";
            latLon.innerHTML = "";
            errorP.innerHTML = "";
            
            setTimeout(() => {
                capital.innerHTML = "Capital : " + data.capital
                setTimeout(() => {
                    condition.innerHTML = "Weather now : " + data.condition
                    setTimeout(() => {
                        latLon.innerHTML =  "Latitude : " + data.latitude + ' Longitude : ' + data.longitude;
                    }, 500);
                }, 500);
            });
        }
        
    } 
    catch(e){
        console.error("Failed to fetch weather data:", e);
        errorP.innerHTML = e;
    }
}