const { urlencoded } = require('express');
const express = require('express')
const app = express()


require('dotenv').config();

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT|| 5000;
app.listen(PORT, ()=>console.log(`The port is listening at ${PORT}`))