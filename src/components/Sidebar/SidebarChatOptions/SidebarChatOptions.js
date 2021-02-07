// import React from 'react'
// import CheckIcon from '@material-ui/icons/Check'
// import NotificationsIcon from '@material-ui/icons/Notifications'
// import PersonIcon from '@material-ui/icons/Person'
// import CallIcon from '@material-ui/icons/Call'
// import VideocamIcon from '@material-ui/icons/Videocam'
// import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// import DeleteIcon from '@material-ui/icons/Delete'
// import db from '../../../context/firebase'
// import './SidebarChatOptions.css'



// function SidebarChatOptions({id}) {

//     const deleteRoomHandler = () => {
//         db.collection("rooms").doc(id).delete()
//     }


//     return (
//         <div className="sidebarChat__menu">
//             <div><span><CheckIcon/></span>Mark as unread</div>
//             <div><span><NotificationsIcon /></span>Mute converstaion</div>
//             <div><span><PersonIcon /></span>View profile</div>
//             <hr />
//             <div><span><CallIcon /></span>Audio call</div>
//             <div><span><VideocamIcon /></span>Video chat</div>
//             <hr />
//             <div><span><DeleteOutlineIcon /></span>Hide converstaion</div>
//             <div onClick={deleteRoomHandler}><span><DeleteIcon /></span>Delete converstion</div>
//         </div>
//     )
// }

// export default SidebarChatOptions
