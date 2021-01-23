import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'


function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__contents">
                <h3>Name</h3>
                <p>Last Message from the universe of the world where I dont knonw..</p>
            </div>
        </div>
    )
}

export default SidebarChat
