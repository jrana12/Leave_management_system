
import React, { useState,useContext } from 'react'
import {useHistory} from 'react-router-dom'
import{UserContext} from '../../App'


const Signin = () =>{
	const {state, dispatch} = useContext(UserContext)

	const history = useHistory()
	const [password,setPassword]=useState("")
	const [email,setEmail]=useState("")
	const postData = ()=>{
		fetch("http://localhost:5000/signin",{
			method:"post",
			headers:{
				"content-Type":"application/json"
			},
			body:JSON.stringify({
				password,
				email,
			})	
		}).then(res=>res.json())
		.then(data=>{
			if(data.error){
				window.alert(data.error);
			}else{
				localStorage.setItem("jwt",data.token)
				localStorage.setItem("user",JSON.stringify(data.user))
				dispatch({type:"USER",payload:data.dispatch})
				history.push('./profile')
				console.log(data)
			}
		}).catch(err=>{
			console.log(err)
		})
	} 

	return(
		<div className="background">
			<div className="home_navbar">
            <ul className="menu">
            <li className="menuchild">XYZ.com</li>
			<li className="menuchild intro">Welcome to XYZ.com!</li>
            </ul>
        	</div>
		<div className="container">
			
            <div className="mycard">
				<div className="signintext">
				<label>Enter Your Email</label><br></br><br></br>
				<input type="text" placeholder="email" size="30" value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br><br></br>
				<label>Enter Your Password</label><br></br><br></br>
				<input type="password" placeholder="password" size="30" value={password} onChange={(e)=>setPassword(e.target.value)}/><br></br><br></br>
				<button className="btn" 
				onClick ={()=>postData()}>Sign In</button>
			</div>
			</div>
		</div>
		<footer className="footer">
			<div className="about">
				<div className="footer_xyz"><img className="logo" src="https://logodix.com/logo/1603726.jpg"/>Xyz.com</div>
				<div>Xyz tower, A Xyz Lane</div>
				<div>Xyz, Delhi-02</div>
				<div>help@xyz.com</div>
				<div className="footer_rights">@xyz.com, all rights reserved</div>
			</div>
			<div className="others">
				<div className="footer_xyz">Company</div>
				<div>About Us</div>
				<div>Careers</div>
				<div>Privacy Policy</div>
			</div>
		</footer>
		</div>
	)
}


export default Signin
