//import express from "express";
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors= require('cors')
require('dotenv').config()
const blogModel = require('./model/blog');

// export routes 
const blog = require('./routes/blog.route')

const url = process.env.DB_URL

const app=express()


// middlewares

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))

// parse application/json
app.use(bodyParser.json())


// allow to all request 
app.use(cors({ origin: "*" }));

//connect to mongoDB server

 mongoose.connect(url/*, {useNewUrlParser: true, useUnifiedTopology:true}*/)
const con=mongoose.connection   

con.on('open', () =>{
    console.log('connected.....')
}) 


const PORT = process.env.PORT || 3000

// route define

app.use('/api/blog', blog)


app.get('/', (req, res) => {
    res.send('welcome to deepu\'s api')
})


// server start
app.listen(PORT, () => {
    console.log(`Server is started at http://localhost:${PORT}`);
})