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
            <p>{roomName}</p>
            <div className="chatInfo__details">
                <div>
                    <p>Customise Chat</p>
                </div>
                <div>
                    <p>Privacy and support</p>
                </div>
                <div>
                    <p>Shared photos</p>
                </div>
            </div>
        </div>
    )
}

export default ChatInfo
