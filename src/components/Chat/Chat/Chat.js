import React, {useState, useEffect, useRef} from 'react'
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
    const [showInfo, setShowInfo] = useState(true)
    const messagesEndRef = useRef(null)


    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => setRoomName(snapshot.data()?.name))

            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot((snapshot) =>(setMessages(snapshot.docs.map((doc) => doc.data())
            )))
                
        }
    }, [roomId])

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({behavior: "auto"})
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    }

    const infoHandler = () => {
        setShowInfo(prevState => (!prevState))
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
                        <InfoIcon onClick={infoHandler}/>
                    </div>
                </div>
                
                <div className="chat__body">
                    {messages.map((message) => (
                        <p key={message} className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                            <span className={`chat__name ${message.name === user.displayName && "chat__noname"}`}>{message.name}</span>
                            {message.message}
                        </p>
                    ))}
                    <div ref={messagesEndRef} />
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
                        <button disabled={!input} onClick={sendMessage}>Submit</button>
                    </form>
                    <EmojiEmotionsIcon />
                    <ThumbUpIcon />
                </div>
            </div>
            {
                showInfo ? (
                    <div className="chat__info">
                        <ChatInfo />
                    </div>
                ) : ('')
            }
            
        </div>
    )
}

export default Chat
