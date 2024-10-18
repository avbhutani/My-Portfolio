const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const SubmitForm = require('./src/controllers/SubmitForm.controller')
require('dotenv').config()
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json())

app.post('/submitForm',SubmitForm);


app.listen(process.env.PORT || 4000, ()=> {
    console.log(`Server is listening at ${process.env.PORT || 4000}`)
})