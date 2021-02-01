import React, {useState, useEffect} from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import './SidebarChat.css'
import db from '../../../context/firebase'
import { Link, useHistory } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'


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

    const deleteRoomHandler = () => {
        db.collection("rooms").doc(id).delete()
        setMessages('')
    }

    const onClickHandler = () => {
        setIsDropDown(prevState => (!prevState))
    }

    return addNewchat ? (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    ) : 
    (
        <>
            <Link to={`/rooms/${id}`}
                onMouseEnter={() => setIsShownOnHover(true)}
                onMouseLeave={() => setIsShownOnHover(false)}
            >
                <div className="sidebarChat">
                    <Avatar />
                    <div className="sidebarChat__contents">
                        <h3>{name}</h3>
                        <p>{messages[0]?.message}</p>
                    </div>
                    {isShownOnHover && (
                        <div className="sidebarChat__hoverIcon" onClick={onClickHandler}>
                            <IconButton>
                                <MoreHorizIcon />
                            </IconButton>
                        </div>)
                    }
                </div>
            </Link>
            {isDropDown && (
                <div className="sidebarChat__menu">
                    <p>Mark as unread</p>
                    <p>Mute converstaion</p>
                    <p>View profile</p>
                    <p><hr/></p>
                    <p>Audio call</p>
                    <p>Video chat</p>
                    <p><hr/></p>
                    <p>Hide converstaion</p>
                    <p onClick={deleteRoomHandler}>Delete converstion</p>
                </div>
            )
            }
        </>
    )
}

export default SidebarChat
