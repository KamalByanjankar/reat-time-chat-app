import React from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import VideoCallIcon from '@material-ui/icons/VideoCall'
import LaunchIcon from '@material-ui/icons/Launch'
import SearchIcon from '@material-ui/icons/Search'
import SidebarChat from '../SidebarChat/SidebarChat.js'

import './Sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar />
                <h1>Chats</h1>
                <div className="sidebar__headerIcons">
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                    <IconButton>
                        <VideoCallIcon />
                    </IconButton>
                    <IconButton>
                        <LaunchIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input 
                        type="text"
                        placeholder="Search Messenger"
                    />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
