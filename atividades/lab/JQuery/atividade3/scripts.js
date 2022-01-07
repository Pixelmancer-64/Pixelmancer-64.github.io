$(function(){
    fetch('https://rafaelescalfoni.github.io/desenv_web/receitas.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let aux = ''
        data.forEach(recipe => {
            let preparoAux = '';
            let ingredientesAux = '';
    
            recipe.preparo.forEach((preparo) =>{
                const li = document.createElement("li");
                li.appendChild(document.createTextNode(preparo));
                preparoAux += li.outerHTML;
            })
            recipe.ingredientes.forEach(function(ingrediente){
                const li = document.createElement("li");
                li.appendChild(document.createTextNode(ingrediente));
                ingredientesAux += li.outerHTML;
            })
        
          aux += `
          <div class = "receita">
          <div class = "mainDescription">
            <h1>${recipe.nome}</h1>
            <img src ="${recipe.foto}">
            <h3>${recipe.descricao}</h3>
            </div>
            <div class="DIY">
            <h2>Ingredientes: </h2> <ul>${ingredientesAux}</ul>
            <h2>Preparo: </h2> <ol>${preparoAux}</ol>
            </div>
            </div>`;
    
       
        })
        document.querySelector('body').innerHTML = aux
    })
})