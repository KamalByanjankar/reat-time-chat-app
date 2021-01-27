import React, {useState, useEffect} from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import './SidebarChat.css'
import db from '../../../context/firebase'
import { Link, useHistory } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'


function SidebarChat({name, addNewchat, id}) {
    const [messages, setMessages] = useState('')
    const history = useHistory()
    const [isShown, setIsShown] = useState(false)

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

    return addNewchat ? (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    ) : 
    (
        <>
        <Link to={`/rooms/${id}`}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <div className="sidebarChat">
                <Avatar />
                <div className="sidebarChat__contents">
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
                {isShown && (
                    <div className="sidebarChat__hoverIcon" onClick={deleteRoomHandler}>
                        <IconButton>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>)
                }
            </div>
        </Link>
        </>
    )
}

export default SidebarChat
