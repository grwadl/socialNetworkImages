import { CLOSE_AVATAR_MENU, CLOSE_AVATAR_MODAL, OPEN_AVATAR_MENU, OPEN_AVATAR_MODAL } from "../constants/constants";

const defaultState = {
    active: false,
    openModal:false
}
export const AddAvatarReducer = (state = defaultState, action) => {
    switch (action.type) {
        case OPEN_AVATAR_MENU: return { ...state, active: true }
        case CLOSE_AVATAR_MENU: return { ...state, active: false }
        case OPEN_AVATAR_MODAL: return { ...state, openModal: true }
        case CLOSE_AVATAR_MODAL: return { ...state, openModal: false }
        default: return state;
    }
}