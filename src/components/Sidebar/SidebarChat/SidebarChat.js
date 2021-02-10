import React, {useState, useEffect} from 'react'
import { Avatar, IconButton, Popper } from '@material-ui/core'
import './SidebarChat.css'
import db from '../../../context/firebase'
import { NavLink, useHistory } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Backdrop from '../../Backdrop/Backdrop'

import CheckIcon from '@material-ui/icons/Check'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PersonIcon from '@material-ui/icons/Person'
import CallIcon from '@material-ui/icons/Call'
import VideocamIcon from '@material-ui/icons/Videocam'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import DeleteIcon from '@material-ui/icons/Delete'


function SidebarChat({name, addNewchat, id}) {
    const [messages, setMessages] = useState('')
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)



    useEffect(() => {
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [id])


    const deleteRoomHandler = () => {
        db.collection("rooms").doc(id).delete()
    }


    const createChat = () => {
        const roomName = prompt("Please enter room name to create")

        if(roomName){
            db.collection("rooms").add({
                name: roomName,
            })
        }

        history.push("/")
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpen(prevState => !prevState)
    }

    // const open = Boolean(anchorEl);
    const popperId = open ? 'simple-popper' : undefined;

    const backdropClickedHandler = () => {
        setOpen(false)
    }

    return addNewchat ? (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    ) : 
    (
        <>
            <NavLink 
                exact
                to={`/rooms/${id}`}
                // onMouseEnter={() => setIsShownOnHover(true)}
                // onMouseLeave={() => setIsShownOnHover(false)}
            >
                

                <div className="sidebarChat">
                    <Avatar />
                    <div className="sidebarChat__contents">
                        <h3>{name}</h3>
                        <p>{messages[0]?.message}</p>
                    </div>

                    <IconButton
                        aria-describedby={popperId}
                        onClick={handleClick}>
                        <MoreHorizIcon />
                    </IconButton>
                   
                    <div>
                        {
                            open ? <Backdrop open={open} clicked={backdropClickedHandler} /> : null
                        }
                    
                        <Popper id={popperId} open={open} anchorEl={anchorEl}>
                            <div className="sidebarChat__menu">
                                <div><span><CheckIcon/></span>Mark as unread</div>
                                <div><span><NotificationsIcon /></span>Mute converstaion</div>
                                <div><span><PersonIcon /></span>View profile</div>
                                <hr />
                                <div><span><CallIcon /></span>Audio call</div>
                                <div><span><VideocamIcon /></span>Video chat</div>
                                <hr />
                                <div><span><DeleteOutlineIcon /></span>Hide converstaion</div>
                                <div onClick={deleteRoomHandler}><span><DeleteIcon /></span>Delete converstion</div>
                            </div>
                        </Popper> 

                    </div>                      
                </div>
            </NavLink>
        </>
    )
}

export default SidebarChat
