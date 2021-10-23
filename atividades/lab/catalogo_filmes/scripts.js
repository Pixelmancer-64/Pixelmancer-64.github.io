const http = new EasyAjax
http.get('https://rafaelescalfoni.github.io/desenv_web/filmes.json', function(status, response){
    if(status){
        console.log(status);
    } else {

        let aux = '';
        let ages = [];

        const star = document.createElement("img");
        star.setAttribute("src","/img/star.svg");
        const starHalf = document.createElement("img");
        starHalf.setAttribute("src","/img/starHalf.svg");

        response.forEach(data => {
            const showRating = document.createElement("div");
            let castAux = '<h2>Elenco</h2>';
            let generosAux = '<h2>Gênero</h2>';
            let similarAux = '<h2>Similares</h2>';
            let opinioesAux = '';
            let media = 0;

            function eachForLoops() 
                {data.elenco.forEach(cast => {
                    const li = document.createElement("li");
                    li.appendChild(document.createTextNode(cast));
                    castAux += li.outerHTML;
                });

                data.generos.forEach(genre => {
                    const li = document.createElement("li");
                    li.appendChild(document.createTextNode(genre));
                    generosAux += li.outerHTML;
                });

                data.opinioes.forEach((opinion, k) => {
                    const starDiv = document.createElement("div");
                    starDiv.className = 'rating'
                    const span = document.createElement("span");
                    span.appendChild(document.createTextNode(opinion.descricao));
                    for(let i=0;i<opinion.rating;i++){
                        starDiv.appendChild(star.cloneNode(true)); 
                    }
                    media = (media + opinion.rating)/(k+1);
                    span.appendChild(starDiv);
                    opinioesAux += span.outerHTML;
                });

                data.titulosSemelhantes.forEach((similar, k) => {
                    response.forEach(test => {
                        if(test.id == similar) {
                            const li = document.createElement("li");
                            li.appendChild(document.createTextNode(test.titulo));
                            similarAux += li.outerHTML;
                        }
                    });
                });

                for(let i=0;i<media;i++){
                if(media % 1 !== 0 && i+1 >= media){
                    showRating.appendChild(starHalf.cloneNode(true));
                    break;
                }
                showRating.className = 'showRating';
                showRating.appendChild(star.cloneNode(true)); 
                }
            } eachForLoops();

            aux += `<div class="card">
            <div class="movie">
                <div class="imageContainer">
                    <img src=${data.figura}>
                </div>

                <div class="reviews">
                    ${opinioesAux}
                </div>

            <div class="description">
                <h1>${data.titulo}</h1>
                ${showRating.outerHTML}
                <h4>${data.resumo}</h4>
                
                <hr> 
                
                <div class="showInfo">

                <div class="cast">
                    <ul>
                        ${castAux}
                    </ul>
                </div>
                <div clas="similar">
                    <ul>
                        ${similarAux}
                    </ul>
                </div>
                <div class ="genrers">
                    <ul>
                        ${generosAux}
                    </ul>
                </div>
            </div>
            </div>
            </div>
        </div>`; 

        document.querySelector('body').innerHTML = aux;

        ages.push(data.classificacao);
        });
        const movie = document.querySelectorAll('.movie');
            movie.forEach((element,k) => {
                element.dataset.content = ages[k];
                if (ages[k] <= 14) element.classList.toggle('green');
                else if(ages[k] < 18) element.classList.toggle('yellow');
                else if (ages[k] = 18) element.classList.toggle('red');
                
            });
    }
});