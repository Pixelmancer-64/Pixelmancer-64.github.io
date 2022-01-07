const express = require('express')
const path = require('path')
const app = express()
const redditData = require('./data.json')

app.set('view engine',  'ejs')
app.set('views',  path.join(__dirname, "/views"))

app.use(express.static(path.join(__dirname, "/public")))

app.get('/r/:subreddit', (req, res) => {
    const{subreddit} = req.params;
    const data = redditData[subreddit]
    if(data == undefined) res.render('notFound', {subreddit})
    res.render('home', {...data})
})

app.listen(3000, () => {
        console.log('LISTENING PORT 3000')
})