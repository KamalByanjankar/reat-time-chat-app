import { Avatar } from '@material-ui/core'
import React from 'react'
import './ChatInfo.css'


function ChatInfo() {
    return (
        <div className="chatInfo">
            <Avatar />
            <p>Name</p>
            <div className="chatInfo__details">
                <div>
                    <p>Customise Chat</p>
                </div>
                <div>
                    <p>Privacy and support</p>
                </div>
                <div>
                    <p>Shared photos</p>
                </div>
            </div>
        </div>
    )
}

export default ChatInfo
