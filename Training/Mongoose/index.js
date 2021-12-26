const mongoose = require('mongoose')
const express = require('express')
const app = express()
const path = require('path')
const Word = require('./models/Word')
const methodOverride = require('method-override')


mongoose.connect('mongodb://localhost:27017/wordBank', {useNewUrlParser: true})
.then(() =>{
    console.log("OPEN MongoDB")
})
.catch( err =>{
    console.log(err)
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));



app.listen(6464, () =>{
    console.log('Rodando')
})

app.get('/', async (req, res) =>{
    const all = await Word.find({})
    res.render('words', {all})
})

app.get('/word/new', async (req, res) =>{
    res.render('form')
})

app.post('/word', async (req, res) => {
    const aux = req.body
    const hey = new Word({word: aux.word, description:{language: aux.language, text:aux.text, obscurity: aux.obscurity}, category: [aux.category]})
    await hey.save()
    res.redirect('/')
})

app.get('/word/:id', async (req, res) =>{
    const {id} = req.params
    const found = await Word.findById(id)
    console.log(found)
    res.render('specificWord', {found})
})

app.get('/word/:id/edit', async (req, res) =>{
    const {id} = req.params
    const found = await Word.findById(id)
    console.log(found)
    res.render('edit', {found})
})

app.put('/word/:id', async (req, res) =>{
    const { id } = req.params
    const aux = req.body

    const update = await Word.findByIdAndUpdate(id, {word: aux.word, description:{language: aux.language, text:aux.text, obscurity: aux.obscurity}, category: [aux.category]}, {runValidators: true})
    console.log(update)
    res.redirect('/')
})

app.delete('/word/:id', async (req, res) =>{
    const { id } = req.params
    const update = await Word.findByIdAndDelete(id)
    console.log(update)
    res.redirect('/')
})