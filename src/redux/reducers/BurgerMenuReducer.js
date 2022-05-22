import { TOGGLE_MENU_CLOSE, TOGGLE_MENU_OPEN } from "../constants/constants";

const defaultState = {
    active:false
}
export const BurgerMenuReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TOGGLE_MENU_OPEN: return { ...state, active: true }
        case TOGGLE_MENU_CLOSE: return { ...state, active: false}
        default: return state;
    }
}