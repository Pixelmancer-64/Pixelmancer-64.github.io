const http = new EasyHttp;
const output = document.querySelector('.output');

navigator.geolocation.getCurrentPosition(getDataByCordinates);
function getDataByCordinates(pos){  
    console.log('oi')
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=54a06451d9da40f28c776dbf31a2c366`)
    .then(response => { 

        let aux = `
        <h1>${response.name}</h1>
        <h2>Temperatura: ${Math.round(response.main.temp-273.15)}°C</h3>
        <h3>Sensação térmica: ${Math.round(response.main.feels_like-273.15)}°C</h3>
        <h3>Mínima: ${Math.round(response.main.temp_max-273.15)}°C</h3>
        <h3>Máxima: ${Math.round(response.main.temp_min-273.15)}°C</h3>
        <h3>Humidade: ${response.main.humidity}</h3>
        <h4>Pressão atmosférica: ${response.main.pressure}</h3>
    `;
    output.innerHTML = aux;
    })
    .catch(err => console.log(err));
};
document.getElementById('city-form').addEventListener('submit',function(e){
    const city = document.getElementById('city').value;
    getData(city);
    e.preventDefault();
});

function getData(city){
    http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=54a06451d9da40f28c776dbf31a2c366`)
    .then(response => { 

        let aux = `
        <h1>${response.name}</h1>
        <h2>Temperatura: ${Math.round(response.main.temp-273.15)}°C</h3>
        <h3>Sensação térmica: ${Math.round(response.main.feels_like-273.15)}°C</h3>
        <h3>Mínima: ${Math.round(response.main.temp_max-273.15)}°C</h3>
        <h3>Máxima: ${Math.round(response.main.temp_min-273.15)}°C</h3>
        <h3>Humidade: ${response.main.humidity}</h3>
        <h4>Pressão atmosférica: ${response.main.pressure}</h3>
    `;
    output.innerHTML = aux;
    })
    .catch(err => console.log(err));
}