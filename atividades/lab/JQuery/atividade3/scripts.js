$(function(){
    fetch('https://rafaelescalfoni.github.io/desenv_web/receitas.json')
    .then(res => res.json())
    .then(data => {

        data.forEach(recipe => {
            const preparoAux = $("<ul>");
            const ingredientesAux = $("<ul>");
    
            recipe.preparo.forEach((preparo) =>{
                const li = $("<li>");
                li.text(preparo);
                preparoAux.append(li);
            })
            recipe.ingredientes.forEach(function(ingrediente){
                const li = $("<li>");
                li.text(ingrediente);
                ingredientesAux.append(li);
            })

          const aux = $('<section>');
          aux.append(`
          <h1>${recipe.nome}</h1>
          <img src ="${recipe.foto}">
          <h2>${recipe.descricao}</h2>`)
          aux.append('<h3>Ingredientes</h3>')
          aux.append(ingredientesAux);
          aux.append('<h3>Preparo</h3>')
          aux.append(preparoAux);
            
            $('body').append(aux)
        })
    })
})