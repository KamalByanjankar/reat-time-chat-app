import React from 'react'
import CheckIcon from '@material-ui/icons/Check'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PersonIcon from '@material-ui/icons/Person'
import CallIcon from '@material-ui/icons/Call'
import VideocamIcon from '@material-ui/icons/Videocam'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteIcon from '@material-ui/icons/Delete'
import db from '../../../context/firebase'
import './SidebarChatOptions.css'



function SidebarChatOptions({id}) {

    const deleteRoomHandler = () => {
        db.collection("rooms").doc(id).delete()
    }


    return (
        <div className="sidebarChat__menu">
            <p><span><CheckIcon/></span>Mark as unread</p>
            <p><span><NotificationsIcon /></span>Mute converstaion</p>
            <p><span><PersonIcon /></span>View profile</p>
            <hr />
            <p><span><CallIcon /></span>Audio call</p>
            <p><span><VideocamIcon /></span>Video chat</p>
            <hr />
            <p><span><DeleteOutlineIcon /></span>Hide converstaion</p>
            <p onClick={deleteRoomHandler}><span><DeleteIcon /></span>Delete converstion</p>
        </div>
    )
}

export default SidebarChatOptions
