import React, {useState, useEffect, useRef} from 'react'
import './Chat.css'
import ChatInfo from '../ChatInfo/ChatInfo'
import { Avatar, IconButton, Tooltip } from '@material-ui/core'
import CallIcon from '@material-ui/icons/Call'
import VideocamIcon from '@material-ui/icons/Videocam'
import InfoIcon from '@material-ui/icons/Info'
import ControlPointIcon from '@material-ui/icons/ControlPoint'
import ImageIcon from '@material-ui/icons/Image'
import DescriptionIcon from '@material-ui/icons/Description'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import db from '../../../context/firebase'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../../../context/StateProvider'
import firebase from 'firebase/app'
import ReactTooltip from 'react-tooltip'


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
                        <CallIcon data-tip data-for="voiceCall" />
                        <ReactTooltip id="voiceCall" place="bottom" effect="solid">
                            Start a voice call
                        </ReactTooltip>

                        <VideocamIcon data-tip data-for="videoCall" />
                            <ReactTooltip id="videoCall" place="bottom" effect="solid">
                                Start a video call
                            </ReactTooltip>
                        
                        <InfoIcon onClick={infoHandler} data-tip data-for="infoIcon" />
                            <ReactTooltip id="infoIcon" place="bottom" effect="solid">
                                Conversation information
                            </ReactTooltip>
                    </div>
                </div>
                
                <div className="chat__body">
                    {messages.map((message, index) => (
                        <p 
                            key={index} 
                            className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}
                        >
                            <span className={`chat__name ${message.name === user.displayName && "chat__noname"}`}>{message.name}</span>
                            {message.message}
                        </p>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat__footer">
                    <IconButton>
                        <ControlPointIcon />
                    </IconButton>
                    <IconButton>
                        <ImageIcon />
                    </IconButton>
                    <IconButton>
                        <DescriptionIcon />
                    </IconButton>
                    <IconButton>
                        <GifIcon />
                    </IconButton>
                    <form>
                        <input 
                            type="text" 
                            placeholder="Aa" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)} 
                            autoFocus   
                        />
                        <button 
                            disabled={!input} 
                            onClick={sendMessage}
                        >Submit
                        </button>
                        <EmojiEmotionsIcon />
                    </form>
                    <IconButton>
                        <ThumbUpAltIcon />
                    </IconButton>
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
