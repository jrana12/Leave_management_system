const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	EmpId:String,
	Joining_Date:String,
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	department:{
		type:String,
		required:true
	},
	designation:{
		type:String,
		required:true
	},
	phone:{
		type:String,
		required:true
	},
	address:{
		type:String,
		required:true
	},
	cl:Number,
	sl:Number,
	pl:Number,
	ml:Number,
	leave_history:[{
        start_date: String,
        end_date: String,
        leave_type: String
	}],
	notifications:[{
        start_date: String,
        end_date: String,
		leave_type: String,
		status:Boolean,
	}],
	actions:[{
		name: String,
		EmpId:String,
		user_dept:String,
		department:String,
		start_date:String,
		end_date:String,
		leave_type:String,
		remarks:String
	}]

})

mongoose.model("User",userSchema)