import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route, useHistory, Switch} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Leavestats from './components/screens/Leavestats'
import Notifications from './components/screens/Notifications'
import {reducer,initialState} from './reducers/userReducer'
import './App.css';
export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      /*history.push('/profile')*/
    }
  },[])
  return(
    <Switch>
    <Route exact path ="/">
        <Home/>
      </Route>
      <Route path ="/signin">
        <Signin/>
      </Route>
      <Route path ="/profile">
        <Profile/>
      </Route>
      <Route path = "/leavestats">
        <Leavestats/>
      </Route>
      <Route path = "/notifications">
        <Notifications/>
      </Route>
      </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
