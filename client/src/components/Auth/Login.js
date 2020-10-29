import React from 'react'
import {useHistory } from "react-router-dom";
import "./style.css"

const Login=(props)=> {

    const {email,
          setEmail,
          password, 
          setPassword, 
          handleLogin, 
          handleSignUp, 
          hasAccount,
          setHasAccount, 
          emailError, 
          passwordError} = props;

    const history = useHistory()

    const handleSignClick =()=>{
            handleLogin()
            history.push('/')            
            
         }

    return (
        <section className="login">
            Login: dv@gmail.com password: Test#123
            <div className="loginContainer">
                <label >UserName</label>
                <input type="text" autoFocus required value={email} onChange = {e=>setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
                <label >Password</label>
                <input type="password"  required value={password} onChange = {e=>setPassword(e.target.value)}/>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        {/* <button onClick={handleLogin}>Sign in</button> */}
                        <button onClick={handleSignClick}>Sign in</button>
                        <p>Don't have an account ? <span onClick={()=> setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                    ) : (
                        <>
                        <button onClick={handleSignUp}>Sign up</button>
                        <p>Have and Account ? 
                        <span onClick={()=> setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )
                }
                </div>

            </div>
        </section>
    )
};

export default Login
