import { CHANGE_AVATAR, CHANGE_TOKEN, LOGIN, LOGOUT } from "../constants/constants"

const defaultState = {
    isAuth: false,
    token: '',
    login: '',
    avatar:''
}
export const AuthReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN: return { ...state, isAuth: true, token:action.payload.token,login:action.payload.login,avatar:action.payload.avatar }
        case LOGOUT: return { ...state, isAuth:false}
        case CHANGE_AVATAR: return { ...state, avatar: action.payload }
        default: return state;
    }
}