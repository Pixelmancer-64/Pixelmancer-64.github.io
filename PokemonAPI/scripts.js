const fetchPokemon = (url) => {
    let i = document.getElementById('min').value
    let pokemons = []
    return function next(){
        fetch(`${url}${i}`)
        .then(res => res.json())
        .then(data => {
            showPokemon(data, verifyname)
            pokemons.push(data);
        })
        .then(() => {
            if(i < document.getElementById('max').value){
                i++;
                next();
            }
        })
        .catch(e => {
            console.log('Error ' + e)
        })
    }
}

function showPokemon(data, callback){

    if(callback(data.name)){
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
    }
}

document.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter') {
        document.querySelector('main').innerHTML = ''
        start()
    }
    else if(e.key == 'j') {
        console.log('limpando')
        document.querySelector('main').innerHTML = ''
    }
    else console.log(e.key)
})

function verifyId(data){
    const gap = document.getElementById('status')
    if(data <= gap.value && data >= gap.value - 50) return true
}

function verifyname(data){
   if(data.indexOf(document.getElementById('name').value) != -1) return true
}

function start(){
    document.querySelector('main').innerHTML = ''
        const aux = fetchPokemon(`https://pokeapi.co/api/v2/pokemon/`)
        aux()
}

window.onload = start;