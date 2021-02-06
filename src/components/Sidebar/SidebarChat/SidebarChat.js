import React, {useState, useEffect} from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import './SidebarChat.css'
import db from '../../../context/firebase'
import { NavLink, useHistory } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import SidebarChatOptions from '../SidebarChatOptions/SidebarChatOptions'
import Backdrop from '../../Backdrop/Backdrop'


function SidebarChat({name, addNewchat, id}) {
    const [messages, setMessages] = useState('')
    const history = useHistory()
    const [isShownOnHover, setIsShownOnHover] = useState(false)
    const [isDropDown, setIsDropDown] = useState(false)


    useEffect(() => {
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [id])



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
        setIsDropDown(prevState => !prevState)
        setIsShownOnHover(true)
    }

    const backdropClickedHandler = () => {
        setIsDropDown(false)
        setIsShownOnHover(false)
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
                onMouseEnter={() => setIsShownOnHover(true)}
                onMouseLeave={() => setIsShownOnHover(false)}
            >
                <div 
                    className="sidebarChat"
                >
                    <Avatar />
                    <div className="sidebarChat__contents">
                        <h3>{name}</h3>
                        <p>{messages[0]?.message}</p>
                    </div>
                    {isShownOnHover && (
                        <div
                            className="sidebarChat__hoverIcon"
                            onClick={handleClick}
                        >
                            <IconButton >
                                <MoreHorizIcon />
                            </IconButton>
                        </div>)
                    }
                </div>
                
                {isDropDown && (
                    <>
                        <SidebarChatOptions id={id}/>
                        <Backdrop clicked={backdropClickedHandler} />
                    </>
                    )  
                }
            </NavLink>
        </>
    )
}

export default SidebarChat
