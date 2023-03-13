const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const app = express()
const cookieParser = require('cookie-parser')
app.use(express.static('public'))

// app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
const { requireAuth, checkUser } = require('./middleware/middleware')
const dbUrl = 'mongodb://127.0.0.1:27017/authrev'
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3500, (err) => {
    if(err) throw err
    console.log('App Running on port 3500..');
})).catch((err) => console.log(err))

// routes

app.get('*', checkUser)


app.get('/', (req, res) => {
    res.render('home')
})
app.get('/smoothies', requireAuth, (req, res) => {
    res.render('smoothies')
    
})

//cookies
// app.get('/set-cookies', (req, res) => {
//     // res.setHeader('Set-Cookie', 'newUser = true')
//     res.cookie('newUser',false)
//     res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true})
//     res.send('You got the cookie!')
// })  
// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies
//     console.log(cookies);
//     res.json(cookies)
// })
app.use(authRoutes)


