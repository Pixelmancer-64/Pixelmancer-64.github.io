fetch('https://rafaelescalfoni.github.io/desenv_web/filmes.json')
    .then(function(res){
        return res.json();
    })
    .then(response => {
        let aux;
        response.forEach(data => {
            let castAux = '';
            let generosAux = '';
            let opinioesAux = '';

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

            data.opinioes.forEach(opnion => {
                const span = document.createElement("span");
                const br = document.createElement("br");
                span.appendChild(document.createTextNode(opnion.descricao));
                span.appendChild(br);
                opinioesAux += span.outerHTML;
            });

            aux += `<div class="card">
            <div class="movie">
                <div class="imageContainer">
                    <img src=${data.figura}>
                </div>
            <div class="description">
                <h1>${data.titulo}</h1>
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
                    <hr>
                </div>
                <div class="reviews">
                <h2>Reviews</h2>
                    ${opinioesAux}
                </div>
            </div>
            </div>
        </div>`; 
        });

document.querySelector('body').innerHTML = aux;
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
