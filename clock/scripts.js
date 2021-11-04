setInterval(dig,1000)
setInterval(clock,1000)
const hourAux = document.getElementById('hour')
const minuteAux = document.getElementById('minute')
const secondAux = document.getElementById('second')
function clock(){
    const currentDate = new Date()
    const secondR = currentDate.getSeconds() / 60
    rotation(secondAux, secondR)
    const minuteR = (secondR +currentDate.getMinutes()) / 60
    rotation(minuteAux, minuteR)
    const hourR = (minuteR + currentDate.getHours()) / 12
    rotation(hourAux, hourR)
}

function rotation(dummy, ratio){
    dummy.style.setProperty('--rotation', ratio * 360)
}
function dig(){
document.getElementById('digital').innerHTML = Date();
}
clock()