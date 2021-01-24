import React from 'react'
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


function Chat() {


    return (
        <div className="chat">
            <div className="chat__content">
                <div className="chat__header">
                    <Avatar />
                    <p>Name</p>
                    <div className="chat__headerIcons">
                        <CallIcon />
                        <VideocamIcon />
                        <InfoIcon />
                    </div>
                </div>
                
                <div className="chat__body">
                    <p className="chat__message && chat__receiver">Hello. Thank you for coming.</p>
                    <p className="chat__message">Hello. Thank you for coming.Hello. Thank you for coming.Hello. Thank you for coming.Hello. Thank you for coming.</p>
                </div>

                <div className="chat__footer">
                    <ControlPointIcon />
                    <ImageIcon />
                    <DescriptionIcon />
                    <GifIcon />
                    <form>
                        <input type="text" placeholder="Aa" />
                        <button>Submit</button>
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
