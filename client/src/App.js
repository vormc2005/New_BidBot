import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from "./components/Auth/Login"
import fire from './fire'
import HomePage from './Pages/HomePage'
import Footer from './components/Footer/index';
// import Postpage from './Pages/PostPage'
import BidPost from './Pages/BidPost'
import PostPage from './Pages/PostPage'



import './App.css';


function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = ()=>{
    setEmail('');
    setPassword('');
  }

  const clearErrors = ()=>{
    setPasswordError('');
    setEmailError('');
  }

  const handleLogin = ()=>{
    clearErrors()
    fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err=>{
      switch(err.code){
        case "auth/invalid-email":
          case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
        break;
        case "auth/wrong-password":
          setPasswordError(err.message)
        break;
      }
    })

  }

  const handleSignUp = ()=>{
    clearErrors();
    fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err=>{
      switch(err.code){
        case "auth/email-already-in-use":
          case "auth/invalid-email":
         
              setEmailError(err.message);
        break;
        case "auth/weak-password":
          setPasswordError(err.message)
        break;

      }
    })
  }

  const handleLogout = ()=>{
    fire.auth().signOut();
  };

  const authListener =()=>{
    fire.auth().onAuthStateChanged(user =>{
      if(user){
        clearInputs();
        setUser(user)
      }
      else{
        setUser('');
      }
    })
  }

  useEffect(()=>{
    authListener();
  }, [])




  return (
   <Router>
     {user ? (
       <>
       <Navbar hasAccount={hasAccount} setHasAccount={setHasAccount} user={user} handleLogout={handleLogout}/>
        <Route exact path = "/" component={HomePage} />
        <Route exact path ="/postpage" component={PostPage}/>
        <Route exact path ="/BidPost" component={BidPost}/>
      </>
     ):(
       <>
      <Navbar hasAccount={hasAccount} setHasAccount={setHasAccount} user={user} handleLogout={handleLogout}/>
      <Route exact path = "/" component={HomePage} />
      <Route exact path ="/BidPost" component={BidPost}/>
      <Footer />
      <Route exact path="/signin">
        <Login email={email} 
          setEmail = {setEmail} 
          password = {password} 
          setPassword = {setPassword} 
          handleLogin={handleLogin}
          handleSignUp = {handleSignUp}
          hasAccount = {hasAccount}
          setHasAccount={setHasAccount}
          emailError= {emailError}
          passwordError = {passwordError}
          />
     </Route>
    
     <Footer />
     </>
     )}
     

      
   </Router>
  );
}

export default App;
