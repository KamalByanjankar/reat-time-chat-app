import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import db from '../../../context/firebase'
import { Link } from 'react-router-dom'


function SidebarChat({name, addNewchat, id}) {

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
                    {/* <p>Last Message from the universe of the world where I dont knonw..</p> */}
                </div>
            </div>
        </Link>
    )
}

export default SidebarChat
