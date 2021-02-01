import React, {useState, useEffect} from 'react'
import { Avatar } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import './ChatInfo.css'
import db from '../../../context/firebase'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';



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
                <p>Customise chat <span className="chatInfo__arrow"><KeyboardArrowDownIcon/></span></p>
                <p>Group options <span className="chatInfo__arrow"><KeyboardArrowDownIcon/></span></p>
                <p>Chat members <span className="chatInfo__arrow"><KeyboardArrowDownIcon/></span></p>
                <p>Privacy and support <span className="chatInfo__arrow"><KeyboardArrowDownIcon/></span></p>
                <p>Shared photos <span className="chatInfo__arrow"><KeyboardArrowDownIcon/></span></p>
            </div>
        </div>
    )
}

export default ChatInfo
