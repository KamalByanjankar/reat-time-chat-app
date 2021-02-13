import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import VideoCallIcon from '@material-ui/icons/VideoCall'
import LaunchIcon from '@material-ui/icons/Launch'
import SearchIcon from '@material-ui/icons/Search'
import SidebarChat from '../SidebarChat/SidebarChat.js'
import {useStateValue} from '../../../context/StateProvider'
import './Sidebar.css'
import db from '../../../context/firebase.js'
import { useHistory } from 'react-router-dom'
import Backdrop from '../../Backdrop/Backdrop.js'



function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [{user}, dispatch] = useStateValue()
    const history = useHistory()
    const [dropdown, setDropdown] = useState(false)

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))

        return () => {
            unsubscribe()
        }
    }, [])

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        history.push('/')
    }

    const clickHorizontalIconHandler = () => {
        setDropdown(prevState => !prevState)
    }


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} alt="Profile"/>
                <h1>Chats</h1>
                <div className="sidebar__headerIcons">
                    <IconButton onClick={clickHorizontalIconHandler}>
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

            {
                dropdown && (
                    <>
                    <Backdrop clicked={clickHorizontalIconHandler} />

                    <div className="sidebar__headerIconsDropdown">
                        <div>Preferences</div>
                        <hr/>
                        <div>Active contacts</div>
                        <div>Message requests</div>
                        <div>Hidden chats</div>
                        <hr/>
                        <div>Help</div>
                        <div>Report a Problem</div>
                        <hr/>
                        <div>About</div>
                        <div>Terms</div>
                        <div>Privacy Policy</div>
                        <div>Cookie Policy</div>
                        <hr/>
                        <div>New! Messenger for Windows</div>
                        <div onClick={handleLogout}>Log Out</div>
                    </div>
                    </>
                )
            }

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
                <SidebarChat addNewchat />
                {rooms.map(room => (
                    <SidebarChat 
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
