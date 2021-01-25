import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'


function SidebarChat({name}) {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__contents">
                <h3>{name}</h3>
                {/* <p>Last Message from the universe of the world where I dont knonw..</p> */}
            </div>
        </div>
    )
}

export default SidebarChat
