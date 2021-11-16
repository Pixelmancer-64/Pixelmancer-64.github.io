const http = new EasyAjax
http.get('animations.json', function(status, response){
    if(status){
        console.log(status);
    } else {
        let aux = '';
        let already = []

        for(let i=0; i < response.length;){
            let random = Math.floor(Math.random()*response.length)
            if(!already.includes(random)){
                aux += `<div class="card">
                <div class="movie">
                    <div class="imageContainer">
                        <img src=${response[random].picture}>
                    </div>
    
    
                <div class="description">
                    <h1>${response[random].title}</h1>
                    <h4>${response[random].summary}</h4>
                    
                    <hr> 
                    
                    <div class="showInfo">
    
                    <div class="cast">
                    <a href=${response[random].links.github}><img id="github" src="/img/github.svg"></a>
                    </div>
                    <div clas="similar">
                    <a href=${response[random].links.demo}><img id="demo" src="/img/play.svg"></a>
                    </div>
                </div>
                </div>
                </div>
                </div>`; 
    
            document.querySelector('.movies').innerHTML = aux;
            already.push(random)
            i++;
            }
        }
    }
});