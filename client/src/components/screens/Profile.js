import React,{useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import{UserContext} from '../../App'

const Profile = () =>{
	const {state,dispatch} = useContext(UserContext)
	//console.log(state)
	const history=useHistory()
	return(
	<div className="background">
			<div className="home_navbar">
			<ul className="menu">
			<li className="menuchild">XYZ.com</li>
			<li className="menuchild" ><a href="/profile">Profile</a></li>
			<li className="menuchild" ><a href="/leavestats">Leave Stats</a></li>
			<li className="menuchild" ><a href="/notifications">Notifications</a></li>
			<li className="menuchild" >
				<button className = "logout-btn" onClick={()=>{
				localStorage.clear()
				dispatch({type:"CLEAR"})
				history.push('/')
			}}>Log Out</button>
			</li>
      		</ul>
			</div>
			
			
			<div className="profilecontainer">
			<div className="pic">
			
			<div className="placeholder">
			<img src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"/>
			</div>
			</div>
			<div >
				<div className="info">
				<div className="infocard">
				<ul className="infolist">
				<li className="infochild name">{state?state.name:""}</li>
				<li className="infochild">Employee ID: {state?state.EmpId:""}</li>
				<li className="infochild">Joining Date: {state?state.Joining_Date:""}</li>
					<li className="infochild">Department: {state?state.department:""}</li>
					<li className="infochild">Designation: {state?state.designation:""}</li>
					<li className="infochild">Email: {state?state.email:""}</li>
					<li className="infochild">Phone: {state?state.phone:""}</li>
					<li className="infochild">Address: {state?state.address:""}</li>
				</ul>
				</div>
				</div>
			</div>
			</div>
		</div>
	)
}

export default Profile