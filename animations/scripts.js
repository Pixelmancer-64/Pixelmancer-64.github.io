const http = new EasyAjax
http.get('animations.json', function(status, response){
    if(status){
        console.log(status);
    } else {
        let aux = '';
        let ages = [];

        response.forEach(data => {

            console.log(data.links)
            aux += `<div class="card">
            <div class="movie">
                <div class="imageContainer">
                    <img src=${data.picture}>
                </div>


            <div class="description">
                <h1>${data.title}</h1>
                <h4>${data.summary}</h4>
                
                <hr> 
                
                <div class="showInfo">

                <div class="cast">
                <a href=${data.links.github}><img id="github" src="/img/github.svg"></a>
                </div>
                <div clas="similar">
                <a href=${data.links.demo}><img id="demo" src="/img/play.svg"></a>
                </div>
            </div>
            </div>
            </div>
        </div>`; 

        document.querySelector('.movies').innerHTML = aux;

        });
    }
});