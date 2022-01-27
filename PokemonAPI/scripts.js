const fetchPokemon = (url) => {
    request(`${url}?limit=${document.getElementById('max').value}&offset=${document.getElementById('min').value-1}`)
    .then(data => {
        const result = data.results.map(async (e) => request(e.url))
        let filter = Filters.verifyType()
        Promise.all(result).then(aux => aux.map(e => {
            showPokemon(e, filter, Filters.verifyName)
        }))
    })
    .catch(e => {
        console.log('Error ' + e)
    })
}

async function request(e) {
    let res = await fetch(e)
    let data = await res.json()
    return data
}

function showPokemon(data, callback, callback2){
    if(callback(data) && callback2(data)){
        const div = document.createElement('div')
        div.className = 'pokeCard'
        const img = document.createElement('img')
        img.src = data.sprites.front_default
        img.alt = data.name
        const p = document.createElement('p')
        p.innerText = `# ${data.id}`
        const h2 = document.createElement('h2')
        h2.innerText = data.name
        const innerDiv = document.createElement('div')
        innerDiv.className = 'types'

        const types = data.types

        for(let type in types){
            const h3 = document.createElement('h3')
            h3.innerText = types[type].type.name
            h3.className = types[type].type.name
            innerDiv.appendChild(h3)
        }

        div.appendChild(p)
        div.appendChild(img)
        div.appendChild(h2)
        div.appendChild(innerDiv)
        document.querySelector('main').append(div)
        div.addEventListener('click', (e) => {
            let submit;
            if(e.target.parentElement.className == 'types') submit = e.target.parentElement.parentElement.firstChild.innerText.slice(2)
            else submit = e.target.parentElement.firstChild.innerText.slice(2)
            window.location.href = `./pokemon/?id=${submit}`
        })
    }
}

document.getElementById('pokemonName').addEventListener('input', () => start());
document.getElementById('max').addEventListener('input', () => start());
document.getElementById('min').addEventListener('input', () => start());
document.getElementById('typeFilter').addEventListener('submit', (e) => {
    e.preventDefault();
    start()
});

function start(){
    document.querySelector('main').innerHTML = ''
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon`)
}

class Filters{
    static verifyId(data){
        return data.id == parseInt(document.getElementById('pokemonName').value)
    }
    
    static verifyName(data){
        let aux = document.getElementById('pokemonName').value
        if(!isNaN(aux) && aux != '') return Filters.verifyId(data)
        if(data.name.indexOf(aux) != -1) return true
    }
    
    // tem que voltar aqui
    static verifyType(){
        let here = document.getElementById('typeFilter')
        let typesArray = []
        for(let i=0; i<here.length-1; i++){
            if(here[i].checked) typesArray.push(here[i].nextElementSibling.className)
        }
        if(typesArray.length > 2) alert('Pokemons com mais de 2 tipos não existem colega')

        return function(data){
            const types = data.types
            let i = 0
            for(let type in types){
                for(let filter in typesArray){
                    if(types[type].type.name == typesArray[filter]) i++
                }
            }
            return i == typesArray.length
        }
    }
}

window.onload = start;