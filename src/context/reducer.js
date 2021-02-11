let user = localStorage.getItem('currentUser') 
        ? JSON.parse(localStorage.getItem('currentUser')).user
        : ''

let token = localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser')).token
        : ''

export const initialState={
    user: '' || user,
    token: '' || token,
}


const reducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                user: action.payload.user,
                token: action.payload.token
            }
        
        case "LOGOUT":
            return{
                ...state,
                user: '',
                token: ''
            }

        default:
            return state;
    }
}

export default reducer;