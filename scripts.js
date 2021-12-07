const gmail = document.getElementById("gmail");
const outlook = document.getElementById("outlook");
const outlookText = document.getElementById("outlookText");
const gmailText = document.getElementById("gmailText");

gmail.onclick = function(){
    navigator.clipboard.writeText('hugobillemartins@gmail.com');
    gmailText.innerHTML = 'Copiado! ';
}

gmail.addEventListener('dblclick', function(){
    navigator.clipboard.writeText('hugobillemartins@gmail.com');
    gmailText.innerHTML = 'Copiado duas vezes! ';
})

outlook.onclick = function(){
    navigator.clipboard.writeText('hugobillemartins@outlook.com');
    outlookText.innerHTML = 'Copiado!';
}
outlook.addEventListener('dblclick', function(){
    navigator.clipboard.writeText('hugobillemartins@outlook.com');
    outlookText.innerHTML = 'Copiado duas vezes! ';
})



