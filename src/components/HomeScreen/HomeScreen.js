import React from 'react'
import './HomeScreen.css'
import logo from '../../assets/messenger-logo.jpg'

function HomeScreen() {
    return (
        <div className="homeScreen">
            <div className="homeScreen__container">
                <img src={logo} alt="logo"/>
                <p>Messenger helps you connect with people</p>
            </div>
        </div>
    )
}

export default HomeScreen
