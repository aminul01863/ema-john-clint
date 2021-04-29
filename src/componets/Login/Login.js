import React,{useContext, useState} from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSingUp, handleGoogleSignIn, handleSignOut, initializeLoginFremwork, signInWithEmailAndPassword } from '../LoginManager/LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn : false,
    name : "",
    email : '',
    password : '',
    photo : '',  
  });

  initializeLoginFremwork();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  
  //google sign in 
  const googleSignIn=()=>{
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
        })
  }

  //google sign out 
  const googleSignOut=()=>{
      handleSignOut()
      .then(res => {
        handleResponse(res,false);
      })
  }

  //facebook sign in
  const fbSingIn =()=>{
      handleFbSingUp()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur =(e)=>{
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
      // console.log(isFieldValid)
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length >= 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && passwordHasNumber;
      // console.log(isFieldValid)
    }
    //valid check
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }


const handleSubmit = () => {

}

//submit Btn eventHandler
const handleClick = (e)=>{
  // console.log(user.email, user.password)
  if(newUser && user.email && user.password){
    createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then((res)=>{
        handleResponse(res,true);
      })

  }
// Signed in for old user
  if(!newUser && user.email && user.password){
    signInWithEmailAndPassword(user.email, user.password)
    .then((res)=>{
      handleResponse(res, true);
    })
  }
  e.preventDefault();
}

//update user name

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={googleSignOut}>Sign Out</button> :
        <button className="btn btn-success mt-2" onClick={googleSignIn}>Google Sign In</button>
      }
      <br/>
      <button className="btn btn-primary mt-2" onClick={fbSingIn}>Sign in Facebook</button> 
      {
        user.isSignedIn &&
        <div>
         <p>Welcome {user.name}</p>
        <p>Email : {user.email}</p>
        <img src={user.photo} alt=""/>
      </div>
    }
    <h1>Our Own Athuntication</h1>
    
    {/* check box */}
    <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
    <level htmlFor="newUser">New User Sign Up</level>
    <br/>
    <from onSubmit={handleSubmit}>
      {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Enter your name"/>}
      <br/>
      <input type="email" onBlur={handleBlur} name="email" placeholder="Enter your email" required/>
      <br/>
      <input type="password" onBlur={handleBlur} name="password" placeholder="Enter your password" required/>
      <br/>
      {/* <input type="submit" value="Submit"/> */}
    </from>
    <button className="btn btn-dark mt-2" onClick={handleClick}>{newUser ? 'Sign Up' : 'Sign In'}</button>
    <p style={{color:'red'}}>{user.error}</p>
    {
      user.success && <p style={{color:'green'}}>User { newUser ? 'created' : 'Logged In' } successfully</p>
    }
    </div>
  );
}

export default Login;
