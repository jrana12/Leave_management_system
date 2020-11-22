const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Department = mongoose.model("Department")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.post('/signup',(req,res)=>{
	const {name,email,password,department,designation,phone,address,cl,sl,pl,ml,leave_history} = req.body
	if(!email ||! password || !name || !department||!designation||!phone||!address)
	{
		return res.status(422).json({error: "Please add all frields"})
	}
	User.findOne({email: email})
		.then((savedUser)=>{
			if(savedUser){
				return res.status(422).json({error: "user Already Exists"})
			}
			bcrypt.hash(password,13)
			.then(hashedpassword => {
				const user = new User({
					email,password:hashedpassword,name,department,designation,phone,address,cl,sl,pl,ml,leave_history
				})
				user.save()
				.then(user => {
					res.json({message:"Saved Successfully!"})
				})
				.catch(err =>{
					console.log(err)
				})
			})
			
		})
		.catch(err=>{
			console.log(err)
		})
	})

router.post('/adddept',(req,res)=>{
		const {dept_name,hod_name} = req.body
		if(!dept_name || !hod_name)
		{
			return res.status(422).json({error: "Please add all frields"})
		}
		const department = new Department({dept_name,hod_name})
		department.save()
			.then(user => {
			res.json({message:"Saved Successfully!"})
			})
			.catch(err =>{
				console.log(err)
			})
		})			

router.post('/signin',(req,res)=>{
	const {email,password}=req.body;
	if(!email||!password){
		return res.status(422).json({error: "Please add email and password"})
	}
	User.findOne({email:email})
	.then(savedUser =>{
		if(!savedUser){
			return res.status(422).json({error: "Invalid Email or Password"})
		}
		bcrypt.compare(password,savedUser.password)
		.then(domatch => {
			if(domatch){
				//res.json({message:"Successfully Signed In"})
				const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
				const{_id,name,EmpId,Joining_Date,email,department,designation,phone,address,cl,sl,pl,ml,leave_history,notifications,actions} = savedUser
				res.json({token,user:{_id,name,EmpId,Joining_Date,email,department,designation,phone,address,cl,sl,pl,ml,leave_history,notifications,actions}})

			}else{
				return res.status(422).json({error: "Invalid Email or Password"})
			}
		})
		.catch(err=>{
			console.log(err)
		})
	})
}) 

router.post('/forward_leave_application',(req,res)=>{
	console.log(req.body)
	const {actor_name,name,empid,user_dept,dept_name,start_date, end_date,leave_type,remarks}=req.body;
	Department.findOne({dept_name:dept_name})
	.then(savedDepartment=>{
		const {_id, dept_name, hod_name} = savedDepartment
		User.findOne({name:hod_name})
		.then(user=>{
			res.json("found")
			var act = { name: name, EmpId:empid,user_dept:user_dept,department:dept_name,start_date:start_date,end_date:end_date,leave_type:leave_type,remarks:remarks }
			user.actions.push(act)
			user.save()
		})
		.catch(err=>{
			console.log(err)
		})
	})
	.catch(err=>{
		console.log(err)
	})
	User.findOneAndUpdate({name:actor_name},
	{ $pull: { actions: { start_date: start_date, name:name} }},{new: true} )
	.then(actor_user=>{
		actor_user.save()
	})
	.catch(err=>{
		console.log(err)
	})
	
})

router.post('/registrar_response',(req,res)=>{

	const {actor_name,name,start_date, end_date,leave_type,status}=req.body;
	User.findOne({name})
	.then(savedUser=>{
		if(!savedUser){
			console.log("User does not exist")
			return res.status(422).json({error: "User does not exist"})
		}
		var numdays =  Math.floor(( Date.parse(end_date) - Date.parse(start_date) ) / 86400000); 
		var notification = {name,start_date,end_date,leave_type,status}
		var history = {start_date,end_date,leave_type}
		savedUser.notifications.push(notification)
		if(status===true){
			savedUser.leave_history.push(history)
			if(leave_type==="Casual Leave"){
				savedUser.cl=savedUser.cl+numdays
			}
			/*if(leave_type==="Earned Leave"){
				savedUser.cl=savedUser.cl-numdays
			}*/
			if(leave_type==="Sick Leave"){
				savedUser.sl=savedUser.sl+numdays
			}
			if(leave_type==="Paternal Leave"){
				savedUser.pl=savedUser.pl+numdays
			}
			if(leave_type==="Maternal Leave"){
				savedUser.ml=savedUser.ml+numdays
			}
		}
		savedUser.save()
		console.log("DONE")
		res.json("found")
	})
	.catch(err=>{
		console.log(err)
	})
	console.log(actor_name)
	User.findOneAndUpdate({name:actor_name},
		{ $pull: { actions: { start_date: start_date} }},{new: true} )
	.then(actor_user=>{
		actor_user.save()
	})
	.catch(err=>{
		console.log(err)
	})
	
	
})
module.exports = router