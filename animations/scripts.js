const http = new EasyAjax
let language = 'EN'
if(navigator.language == "pt-BR") language = 'BR'
http.get(`animationsList - ${language}.json`, function(status, response){
    if(status){
    } else {
        let aux = '';
        let already = []

        for(let i=0; i < response.length;){
            let random = Math.floor(Math.random()*response.length)
            if(!already.includes(random)){
                aux += `<div class="card">
                <div class="card">
                    <div class="imageContainer">
                        <a href='${response[random].links.demo}'><img src='${response[random].picture}'></a>
                        <a href='${response[random].links.github}' class='github'> <img src='/img/github.svg'> </a>
                    </div>
                </div>
                </div>`; 
    
                document.querySelector('main').innerHTML = aux;
                already.push(random)
                i++;
            }
        }
        document.getElementById("counter").innerHTML = `<h1>${already.length} Projects</h1>`
    }
});

document.getElementById('showGithub').addEventListener('change', ()=>{
    console.log('change')
    const aux = document.querySelectorAll('.github')
    aux.forEach( (e) => {
        e.style.display == 'block' ? e.style.display = 'none' : e.style.display = 'block' 
    })
})