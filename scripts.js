let animationsFiles = ["/animations/CircularMotion","/animations/CthulhuEyes","/animations/Dots","/animations/Text","/animations/Colorful","/animations/Fractal_Tree","/animations/Mouse_Effect","/animations/Matrix","/animations/Rain","/animations/Fractal_Snowflake","/animations/Mouse_Trail","/animations/Image","/animations/Ascii","/animations/Generative","/animations/Hexagons","/animations/Loading","/animations/Umbrella"];
document.getElementById("lab").onclick = function () {
    location.href = "/atividades/";
};
document.getElementById("github").onclick = function () {
    location.href = "https://github.com/Sotiris64";
};

document.getElementById("solarSystem").onclick = function () {
    location.href = "https://github.com/Sotiris64/solarSystem";
};

document.getElementById("calc").onclick = function () {
    location.href = "/calculator";
};

document.getElementById("clock").onclick = function () {
    location.href = "/clock";
};

document.getElementById("animation").onclick = function () {
    location.href = animationsFiles[Math.floor(Math.random() * animationsFiles.length)];
};

let i =0
let aux = []
document.addEventListener('keydown', (event) => {
    
    console.log(event.key);
    aux[i] = event.key
    i++
    if(i==7){
        i=0;
        easterEgg = aux.join('');
        console.log(easterEgg);
        if(easterEgg == 'mariana'){
            console.log('deu certo');
        }
    }
    
})

let gmail = document.getElementById("gmail");
let outlook = document.getElementById("outlook");
let outlookText = document.getElementById("outlookText");
let gmailText = document.getElementById("gmailText");

gmail.onclick = function(){
    let address = 'hugobillemartins@gmail.com';
    navigator.clipboard.writeText(address);
    gmailText.innerHTML = 'Copiado! ';
}

gmail.addEventListener('dblclick', function(){
    let address = 'hugobillemartins@gmail.com';
    navigator.clipboard.writeText(address);
    gmailText.innerHTML = 'Copiado duas vezes! ';
})

outlook.onclick = function(){
    let address = "hugobillemartins@outlook.com";
    navigator.clipboard.writeText(address);
    outlookText.innerHTML = 'Copiado!';
}
outlook.addEventListener('dblclick', function(){
    let address = 'hugobillemartins@gmail.com';
    navigator.clipboard.writeText(address);
    outlookText.innerHTML = 'Copiado duas vezes! ';
})



