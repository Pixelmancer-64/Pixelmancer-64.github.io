function request(pos){
    const http = new EasyAjax
    const apiKey = '54a06451d9da40f28c776dbf31a2c366'
    const city = 'Rio de Janeiro'
    const lang = navigator.language.toLowerCase().replace('-','_')
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}&units=metric`

    if(pos != false){ 
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=metric`

    }
    http.get(url, function(status, response){
        if(status){
            console.log(status)
        } else {
            document.querySelector('main').innerHTML = `
            <div class="temperature">
                <h3>Max: ${Math.round(response.main.temp_max)}°C</h3> <h1>${Math.round(response.main.temp)}°C</h1>  <h3>Min: ${Math.round(response.main.temp_min)}°C</h3>
                </div>

            <div class="image">
                <img src= "http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png" alt="${response.weather[0].description}" title="${response.weather[0].description}">
                <figcaption>${response.weather[0].description}</figcaption>
                </div>

            <div class="extraInfo">
                        
                <div class="moreExtraInfo"> 
                    Humidade: ${response.main.humidity}, Pressão Atmosférica: ${response.main.pressure}, Nível do mar: ${response.main.sea_level} 
                    </div>

                <h1> Latitude: ${response.coord.lat}, Longitude ${response.coord.lon} </h1>
                <h1>${response.name} </h1>

                </div>
            `
            console.log(response)
        }
    });
}

window.onload = function(){
    const options = {
        enableHighAccuracy: true,
        maximumAge: 0
    };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        request(false)
    }
    navigator.geolocation.getCurrentPosition(request, error, options);
}
