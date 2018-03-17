const express = require('express')

const app = express()
// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use('/public', express.static(__dirname + '/public'))
app.listen(port, () => console.log('Server started'))
app.get('/', (req, res) => res.render('home'))
