import React,{useEffect,useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import{UserContext} from '../../App'

const Notifications = () => {
	const {state,dispatch} = useContext(UserContext)
	const history=useHistory()
	var [myactions, setmyactions] = useState(state?state.actions:[]);
	var [unchanged,setunchanged] = useState(true)
	if(state&&unchanged===true)
		myactions=state.actions
	const acceptButton = (act) =>{
		setunchanged(false)
		var designation = state?state.designation:""
		const {name,start_date, end_date,leave_type} = act
		if(designation==="Registrar")
		{
			var actor_name = state.name
			window.alert("Leave Accepted!")
			
			fetch("http://localhost:5000/registrar_response",{
			method:"post",
			headers:{
				"content-Type":"application/json"
			},
			body:JSON.stringify({
				actor_name,
				name,
				start_date,
				end_date,
				leave_type,
				status:true
	
			})	
			}).then(res=>res.json())
			.catch(err=>{
				console.log(err)
			})
		}
		else
		{
			const {name,empid,user_dept,dept_name,start_date, end_date,leave_type,remarks} = act
			const department = "Registrar"
			fetch("http://localhost:5000/forward_leave_application",{
				method:"post",
				headers:{
					"content-Type":"application/json"
				},
				body:JSON.stringify({
					actor_name:state.name,
					name,
					EmpId:empid,
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
			window.alert("Forwarded the Leave!")
		}
		const newmyactions = myactions.filter((item) => (item.start_date !== start_date)||(item.name!==name));
		setmyactions(newmyactions);
	}
	const rejectButton = (act) =>{
		setunchanged(false)
		const {name,empid,user_dept,dept_name,start_date, end_date,leave_type,remarks} = act
		var actor_name = state.name
			window.alert("Leave Rejected!")
			
			fetch("http://localhost:5000/registrar_response",{
			method:"post",
			headers:{
				"content-Type":"application/json"
			},
			body:JSON.stringify({
				actor_name,
				name,
				start_date,
				end_date,
				leave_type,
				status:false
	
			})	
			}).then(res=>res.json())
			.catch(err=>{
				console.log(err)
			})
			const newmyactions = myactions.filter((item) => (item.start_date !== start_date)||(item.name!==name));
			setmyactions(newmyactions);	
	}

	/*Working with Remark*/

	const showremark = (act) =>
	{
		/*window.alert(act.remarks)*/
		setStyle({display:'block'})
	}
	
	const hideremark = () =>
	{
		setStyle({display:'none'})
	}
	var [style,setStyle] = useState({display:'none'}) 

		return(
			
			<div className="background">
			<div className="notifycontainer">
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
			
			{myactions.length>0?<div><h2>PENDING REQUESTS</h2></div>:<div><h2>NO PENDING REQUEST AS OF NOW</h2></div>}	
					<div>
					<ul className="pending">
					{myactions.map(((act) => 
						<li>
						<div>Name:<br></br> {act.name}</div>
						<div>Employee Id:<br></br> {act.EmpId}</div> 
						<div>Department:<br></br> {act.user_dept}</div> 
						<div>Start Date:<br></br>{act.start_date}</div> 
						<div>End Date:<br></br>{act.end_date}</div>
						<div>Leave Type:<br></br>{act.leave_type}</div>
						<div className="tooltip"><button className="acceptbtn">Remark</button><span className="tooltip_text">{act.remarks}</span></div>
						<div><button className="acceptbtn" onClick ={()=>acceptButton(act)}>Accept</button></div>
						<div><button className="rejectbtn" onClick ={()=>rejectButton(act)}>Reject</button></div>
						{/*<span style={style}>
						<div className="remarktext"></div>
					<div><button className="remarkbtn" onClick={()=>hideremark()}>Close</button></div></span>*/}
					</li>
						))
					}
					</ul>
					</div>
			
			{state?(state.notifications.length>0?<div><h2>MY NOTIFICATIONS</h2></div>:<div><h2>NO NOTIFICATIONS AS OF NOW</h2></div>):console.log("")}
			
			<div>
			<ul className="mynotify">
			{state?state.notifications.map((notification => 
				<li>
				<div>Start Date:<br></br>{notification.start_date}</div> 
				<div>End Date:<br></br>{notification.end_date}</div>
				<div>Leave Type:<br></br>{notification.leave_type}</div>
				<div> Status:<br></br>{notification.status?"Accepted":"Declined"}</div>
				</li>
				))
			:console.log("")}
			</ul>
			</div>
			
			</div>
			</div>
		);
}

export default Notifications ;