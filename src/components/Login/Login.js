import React from 'react'
import logo from '../../assets/messenger-logo.jpg'
// import {Button} from '@material-ui/core'

import './Login.css'

function Login() {

    const btnClickedHandler = () =>{
        console.log('Sign in button clicked')
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={logo} alt="Logo"/>
                <h1>Sign in to Messenger</h1>
                <button onClick={btnClickedHandler}>Sign In with Google</button>
            </div>
        </div>
    )
}

export default Login
