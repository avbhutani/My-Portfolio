const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const Contact = require('./src/controllers/Contact.controller')
require('dotenv').config()

app.get('/',(req,res)=>{
    res.json({message:'Ok this is the response in json'})

    console.log('/ was hit.')
})
// app.use(bodyParser)
app.post('/contact',Contact);
// Used for the contact page.
app.get('/contact',(req,res)=> {
    res.send('Ok')
    console.log('The API was hit!')
})



app.listen((process.env.PORT || 8000), ()=> {
    console.log(`Server is listening at ${process.env.PORT}`)
})