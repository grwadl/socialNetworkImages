import { CHANGE_PAGE, CHANGE_POST} from "../constants/constants";

const defaultState = {
    current: 'Main',
    postId: ''
}
export const CurrentPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_PAGE: return { ...state, current: action.payload }
        case CHANGE_POST: return { ...state, postId: action.payload }
        default: return state;
    }
}