import React, {useState, useEffect} from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import db from '../../../context/firebase'
import { Link } from 'react-router-dom'


function SidebarChat({name, addNewchat, id}) {
    const [messages, setMessages] = useState('')

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
    }

    return addNewchat ? (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    ) : 
    (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar />
                <div className="sidebarChat__contents">
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
