import { CLOSE, OPEN } from "../constants/constants";

const defaultState = {
    active:false
}
export const ModalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case OPEN: return { ...state, active: true }
        case CLOSE: return { ...state, active: false}
        default: return state;
    }
}