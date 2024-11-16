import React, {useState,createContext, useEffect} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import { onAuthStateChanged, createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut} from "firebase/auth";
import {auth,app} from './config/firebase';
import {getDatabase,ref,set,push} from "firebase/database"
import './App.css';
import Login from './components/auth/login.js'
import SignUp from './components/auth/signUp.js'
import Admin from './components/auth/admin.js'
import UserProfile from "./components/userComp/userProfile.js";

function App() {
  const [inputType,setInputType] = useState('password');
  const [user,setUser] = useState({});
  const [loggedIn,setLoggedIn] = useState(false);

  useEffect( ()=>{
    const userState = user;
    const currentUser = auth.currentUser;
    console.log(auth.currentUser)
    if(currentUser){
      console.log(currentUser)
    } else{
      console.log("no User")
    }
    
     onAuthStateChanged(auth,  (user) => {
      console.log(user)
      console.log(userState,user);
      if (user && userState.type === "signup") {
        const uid = user.uid;
        const fname = userState.fname;
        const lname = userState.lname;
        const db = getDatabase(app);
        const newDocRef = push(ref(db,`users/${uid}`));
        set(newDocRef,{
            "fname": fname,
            "lname": lname
          }).then(()=>{
            console.log('saved')
          }).catch((error)=>{
            alert(error.message)
          })
            console.log("hi")
          } else if (user && userState.type === "login"){

            console.log('logging in')
          } else { console.log('signed out')}
        });
      },[onAuthStateChanged])

  const authHandler = async (e) => {
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
        const type = formData.type;
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('Signed in!!')
          console.log(user);
          const email = user.email;
          setUser({ user, formData });
          setLoggedIn(true);
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
        const type = formData.type;
        const fname = formData.fname;
        const lname = formData.lname;
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userId = user.uid;
            console.log(user)
            setUser({ user, email, type,lname,fname });
            setLoggedIn(true)
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

  const logOut = async ()=>{
    await signOut(auth).then(() => {
      setUser({})
      setLoggedIn(false)
    }).catch((error) => {
      // An error happened.
    });
  }

  const isUser=()=>{
    console.log(auth.currentUser);
  }
  console.log(auth.currentUser);
  console.log(user.uid)
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              MaximusX
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
                <li className="nav-item" onClick={logOut}>
                  <button onClick={isUser}>
                    Is User?
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={auth.currentUser !== null ? <Navigate to={`/user/${user.user.uid}`} replace={true} /> : <Login authHandler={authHandler} showP={showP} inputType={inputType}/>} />
              <Route path="/sign-in" element={auth.currentUser? <Navigate to={`/user/${user.user.uid}`} replace={true} /> :<Login authHandler={authHandler} showP={showP} inputType={inputType}/>} />
              <Route path="/sign-up" element={auth.currentUser ? <Navigate to={`/user/${user.user.uid}`} replace={true} /> :<SignUp authHandler={authHandler} showP={showP} inputType={inputType}/>} />
              <Route path="/admin" element={<Admin authHandler={authHandler} showP={showP} inputType={inputType}/>} />
              <Route path="/user/:uid" element={<UserProfile user={user}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
