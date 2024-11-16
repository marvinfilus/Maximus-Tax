import React, {useState,createContext, useEffect} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut} from "firebase/auth";
import {auth} from './config/firebase';
import {getDatabase,ref,set,push} from "firebase/database"
import './App.css';
import Login from './components/login.js'
import SignUp from './components/signUp.js'
import Admin from './components/admin.js'


function App() {
  const [inputType,setInputType] = useState('password');
  const [user,setUser] = useState({});
  const [userID,setuserID] = useState("");

  const authHandler = (e) => {
    e.preventDefault();
    const elements = e.target;
    const formData = {};
        Array.from(elements).forEach(field =>{
            if(!field.name) return;
            formData[field.name] = field.value;
        })
      console.log(formData);
      if(formData.type ==="admin"){
        const email = formData.email; 
        const password = formData.password;

      }else if(formData.type ==="login"){
        const email = formData.email; 
        const password = formData.password;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('Signed in!!')
          console.log(user);
          const email = user.email;
          setuserID({userID : user.uid})
          setUser({
            userID,
            email
          });

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("not logged in")
          console.log('error code',errorCode)
          console.log('error message',errorMessage)
      });
      }else if(formData.type ==="signup"){
        const email = formData.email; 
        const password = formData.password;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("not logged in")
            console.log('error code',errorCode)
            console.log('error message',errorMessage)
        });
      }

  }

  const showP = (e) => {
    console.log(e.target.parentElement.nextSibling,show)
    var show = (e.target.parentElement.nextSibling.type)
    if(show === "password"){
      setInputType({inputType:"text"})
      console.log(inputType)
    } else{
      setInputType({inputType:"password"})
    }
    
  }

  const logOut =()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              positronX
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/admin'}>
                    Admin
                  </Link>
                </li>
                <li className="nav-item" onClick={logOut}>
                  <Link className="nav-link" to={'/'}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">

            <Routes>
              <Route exact path="/" element={<Login authHandler={authHandler} showP={showP} inputType={inputType}/>} />
              <Route path="/sign-in" element={<Login authHandler={authHandler} showP={showP} inputType={inputType}/>} />
              <Route path="/sign-up" element={<SignUp authHandler={authHandler} showP={showP} inputType={inputType}/>} />
              <Route path="/admin" element={<Admin authHandler={authHandler} showP={showP} inputType={inputType}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
