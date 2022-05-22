import {SET_LOGIN_ERR, SET_REG_ERR} from "../constants/constants";

const defaultState = {
    loginErrors: '',
    regErrors:[]
}
export const ErrorsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_REG_ERR: return { ...state, regErrors: action.payload }
        case SET_LOGIN_ERR: return { ...state, loginErrors: action.payload }
        default: return state;
    }
}