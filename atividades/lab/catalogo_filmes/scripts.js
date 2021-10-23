fetch('https://rafaelescalfoni.github.io/desenv_web/filmes.json')
    .then(function(res){
        return res.json();
    })
    .then(response => {
        let aux = '';
        let ages = [];
        const star = document.createElement("img");
        star.setAttribute("src","/img/star.svg");
        const starHalf = document.createElement("img");
        starHalf.setAttribute("src","/img/starHalf.svg");
        response.forEach(data => {
            let castAux = '';
            let generosAux = '';
            let opinioesAux = '';
            let media = 0;
            data.elenco.forEach(cast => {
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
            
            const showRating = document.createElement("div");
            for(let i=0;i<media;i++){
                if(media % 1 !== 0 && i+1 >= media){
                    showRating.appendChild(starHalf.cloneNode(true));
                    break;
                }
                showRating.className = 'showRating';
                showRating.appendChild(star.cloneNode(true)); 
            }

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
                <div class="cast">
                <h2>Elenco</h2>
                    <ul>
                        ${castAux}
                    </ul>
                </div>
                <hr>
                <div class="genre">
                <h2>Gênero</h2>
                    <ul>
                        ${generosAux}
                    </ul>
                </div>
            </div>
            </div>
        </div>`; 
        ages.push(data.classificacao)

        document.querySelector('body').innerHTML = aux;
        });
        const movie = document.querySelectorAll('.movie');
            movie.forEach((element,k) => {
                element.dataset.content = ages[k]
                if (ages[k] <= 14) element.classList.toggle('special');
                else if(ages[k] < 18) element.classList.toggle('special_yellow');
                else if (ages[k] = 18) element.classList.toggle('special_red');
                
            });
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
