import React from 'react'
import './Chat.css'
import ChatInfo from '../ChatInfo/ChatInfo'

function Chat() {
    return (
        <div className="chat">
            <div className="chat__content">
                <h1>Chat Messages</h1>
            </div>
            <div className="chatInfo">
                <ChatInfo />
            </div>
        </div>
    )
}

export default Chat
