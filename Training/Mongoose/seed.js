const mongoose = require('mongoose')
const Word = require('./models/Word')

mongoose.connect('mongodb://localhost:27017/wordBank', {useNewUrlParser: true})
.then(() =>{
    console.log("OPEN MongoDB")
})
.catch( err =>{
    console.log(err)
})

const p = new Word({
    word: 'Kessler syndrome',
    description: {
        language: 'BR',
        text: 'Lixo espacial que bate em mais lixo espacial que cria mais lixo espacial, impossibilitando o lançamento de novos foguetes e/ou satélites',
        obscurity: 3
    },
    category: ['science', 'astronomy', 'space']
})

p.save().then(res =>{
    console.log(res)
})
.catch(err =>{
    console.log(err)
})
