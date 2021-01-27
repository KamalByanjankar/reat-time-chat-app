import React, {useState, useEffect} from 'react'
import { Avatar } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import './ChatInfo.css'
import db from '../../../context/firebase'



function ChatInfo() {
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState('')

    useEffect(() => {
        db.collection("rooms").doc(roomId).onSnapshot(snapshot => setRoomName(snapshot.data()?.name))
    }, [roomId])

    return (
        <div className="chatInfo">
            <Avatar />
            <p className="chatInfo__roomName">{roomName}</p>
            <div className="chatInfo__details">
                <p>Customise chat</p>
                <p>Group options</p>
                <p>Chat members</p>
                <p>Privacy and support</p>
                <p>Shared photos</p>
            </div>
        </div>
    )
}

export default ChatInfo
