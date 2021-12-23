const fetchPokemon = (url) => {
    request(url)
    .then(data => {
        showPokemon(data)
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

function showPokemon(data){
    const div = document.createElement('div')
    div.className = 'pokeCard'
    const img = document.createElement('img')
    img.src = data.sprites.versions['generation-v']['black-white'].animated.front_default
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

    let aux = `
        <ul>
            <li>Height: ${data.height / 10} M</li>
            <li>Weight: ${data.weight / 10} Kg</li>
        </ul>
    `

    const main = document.querySelector('main')
    const aside = document.querySelector('aside')

    aside.appendChild(p)
    aside.appendChild(img)
    aside.appendChild(h2)
    aside.appendChild(innerDiv)
    main.innerHTML = aux
}

function start(){
    document.querySelector('main').innerHTML = ''
    let params = new URLSearchParams(location.search);
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${params.get('id')}`)
}

window.onload = start;