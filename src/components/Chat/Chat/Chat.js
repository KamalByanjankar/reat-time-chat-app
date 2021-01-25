import React, {useState, useEffect} from 'react'
import './Chat.css'
import ChatInfo from '../ChatInfo/ChatInfo'
import { Avatar } from '@material-ui/core'
import CallIcon from '@material-ui/icons/Call'
import VideocamIcon from '@material-ui/icons/Videocam'
import InfoIcon from '@material-ui/icons/Info'
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import ImageIcon from '@material-ui/icons/Image'
import DescriptionIcon from '@material-ui/icons/Description'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import db from '../../../context/firebase'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../../../context/StateProvider'
import firebase from 'firebase/app'


function Chat() {
    const [input, setInput] = useState('')
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{user}] = useStateValue()


    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => setRoomName(snapshot.data().name))

            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot((snapshot) =>(setMessages(snapshot.docs.map((doc) => doc.data())
            )))
                
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: 'kamal',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__content">
                <div className="chat__header">
                    <Avatar />
                    <p>{roomName}</p>
                    <div className="chat__headerIcons">
                        <CallIcon />
                        <VideocamIcon />
                        <InfoIcon />
                    </div>
                </div>
                
                <div className="chat__body">
                    {messages.map((message, index) => (
                        <p key={index} className={`chat__message ${true && "chat__receiver"}`}>
                            {message.message}
                        </p>
                    ))}
                </div>

                <div className="chat__footer">
                    <ControlPointIcon />
                    <ImageIcon />
                    <DescriptionIcon />
                    <GifIcon />
                    <form>
                        <input 
                            type="text" 
                            placeholder="Aa" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}    
                        />
                        <button onClick={sendMessage}>Submit</button>
                    </form>
                    <EmojiEmotionsIcon />
                    <ThumbUpIcon />
                </div>
            </div>

            <div className="chatInfo">
                <ChatInfo />
            </div>
        </div>
    )
}

export default Chat
