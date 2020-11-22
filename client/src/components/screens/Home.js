import {useHistory} from 'react-router-dom'
import React from 'react'
import Signin from './Signin'


const Home = () =>{
    const history = useHistory()
    history.push('/signin')
    return(
        
		
		<div className="background">
        <div className="home_navbar">
            <ul className="menu">
            <li className="menuchild">XYZ.inc</li>
            <li className="menuchild"><a href="/signin">Sign In</a></li>
            </ul>
        </div>
        <h3 className="home_intro">Welcome to the leave management system of XYZ.inc</h3>
        </div>

	)
}

export default Home