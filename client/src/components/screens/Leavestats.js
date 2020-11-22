import React,{useEffect,useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import{UserContext} from '../../App'

const Userleave = () =>{
	const {state,dispatch} = useContext(UserContext)
	const history=useHistory()
	const [start_date,setStartDate]=useState(Date())
	const [end_date,setEndDate]=useState(Date())
	const [remarks,setRemarks]=useState("No Remarks")
	var name=state?state.name:""
	var department=state?state.department:""
	var designation=state?state.designation:""
	var user_dept = state?state.department:""
	var empid=state?state.EmpId:""
	if(designation=="Department Head")
	{
		department="Registrar"
	}
	const [leave_type,setLeaveType]=useState("Casual Leave")
	const postData = ()=>{
		if(start_date>end_date)
		{
			window.alert("Start Date cannot be greater than End Date")
			return;
		}
		fetch("http://localhost:5000/forward_leave_application",{
			method:"post",
			headers:{
				"content-Type":"application/json"
			},
			body:JSON.stringify({
				actor_name:name,
				name,
				empid,
				user_dept:user_dept,
				dept_name:department,
				start_date,
				end_date,
				leave_type,
				remarks
	
			})	
		}).then(res=>res.json())
		.catch(err=>{
			console.log(err)
		})
		window.alert("Successfully Applied for Leave!")
	} 

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
		<div className="leavecontainer">
		<div className="leaveapply">
		<div className="leaveapplycard">
		<form onsubmit="return false">
		<h2>Apply for Leave</h2>
		<label> Start Date : </label><br></br>
		<input type="date" name="startdate" value={start_date} onChange={(e)=>setStartDate(e.target.value)}/><br></br><br></br>
		
		<label>End Date : </label><br></br>
		<input type="date" name="enddate" value={end_date} onChange={
			(e)=>setEndDate(e.target.value)}/><br></br><br></br>
		
		<label>Leave Type : </label><br></br>


		<select name="type" value={leave_type} onChange={(e)=>setLeaveType(e.target.value)}>
		<option value="Casual Leave">Casual Leave</option>
		<option value="Sick Leave">Sick Leave</option>
		<option value="Paternal Leave">Paternal Leave</option>
		<option value="Maternal Leave">Maternal Leave</option>
		</select>
		<br></br><br></br>
		<label>Remarks :</label><br></br>
		<input type="text" value={remarks} onChange={(e)=>setRemarks(e.target.value)}/>
		<br></br><br></br>
		<br></br>
		<button className="applyleavebtn"
		 type="button" onClick ={()=>postData()}>APPLY FOR LEAVE</button>
		
		</form>
		</div>
		</div>
		<div className = "leavestatuses">
		<div className="leavestats">
		<h2>Leave Status</h2>
		<table>
		<tr><th>2020 Leave</th><th>Total</th> <th>Used</th><th></th></tr>
		<tr><th>Casual Leave</th><td>12</td><td>{state?state.cl:"loading"}</td></tr><br></br>
		<tr><th>Other Leaves</th><th>Total</th> <th>Used</th></tr>
		<tr><th>Sick Leave</th><td>12</td><td>{state?state.sl:"loading"}</td></tr>
		
		<tr><th>Paternal Leave</th><td>90</td><td>{state?state.pl:"loading"}</td></tr>
		
		<tr><th>Maternal Leave</th><td>190</td><td>{state?state.ml:"loading"}</td></tr><br></br><br></br>
		</table>
		</div>
		
		
		<div className="leavehist">
			<h2>My Leave History</h2>
		<table>
		<tr><th>Start Date</th><th>End Date</th><th>Type</th></tr><br></br>
		{state?state.leave_history.map((leave => 
				<tr><td>{leave.start_date}</td><td>{leave.end_date}</td><td>{leave.leave_type}</td></tr>
				))
			:console.log("")
		}
		</table>
		</div>
		</div>

		</div>
		</div>
		);

}

export default Userleave;