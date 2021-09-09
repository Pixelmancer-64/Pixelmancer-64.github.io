document.getElementById("lab").onclick = function () {
    location.href = "/atividades/index.html";
};
document.getElementById("github").onclick = function () {
    location.href = "https://github.com/Sotiris64";
};

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