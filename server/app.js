const express = require('express')
const app= express()
const cors = require('cors')
const PORT = 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
const bodyParser = require('body-parser')


require('./models/user')
require('./models/department')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(MONGOURI,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify:false
})
mongoose.connection.on('connected',() => {
	console.log("Connected!!")
})
mongoose.connection.on('error',(err) => {
	console.log("Error!!",err)
})



app.listen(PORT,() => {
	console.log("Server is running on ",PORT)
})