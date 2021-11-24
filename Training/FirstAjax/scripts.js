const xhr = new XMLHttpRequest();
  
xhr.open('GET', 'receitas.json', true);
    
xhr.onload = function(){
    if(this.status === 200) {
    const recipes = JSON.parse(this.responseText);
    let aux = '';
        recipes.forEach(function(recipe){
            
            let preparoAux = '';
            recipe.preparo.forEach(function(preparo){
                preparoAux += `
                    <li>${preparo}</li>
                `
            })
            
            let ingredientesAux = '';
            recipe.ingredientes.forEach(function(ingrediente){
                ingredientesAux += `
                    <li>${ingrediente}</li>
                `
            })

          aux += `
            <h1>ID: ${recipe.id}</h1>
            <h1>${recipe.nome}</h1>
            <img src ="${recipe.foto}">
            <h3>${recipe.descricao}</h3>
            <h2>Preparo: </h2> <ol>${preparoAux}</ol>
            <h2>Ingredientes: </h2> <ul>${ingredientesAux}</ul>
        `;
        });
  
        document.getElementById('recipes').innerHTML = aux;
      }
}
  
xhr.send();

