const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
	dept_name:{
		type:String,
		required:true
	},
	hod_name:{
		type:String,
		required:true
	},
})

mongoose.model("Department",departmentSchema)