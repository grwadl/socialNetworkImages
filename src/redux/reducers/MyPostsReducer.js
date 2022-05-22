import { ADD_POST} from "../constants/constants";

const defaultState = {
    posts: []
}
export const MyPostsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_POST: return { ...state, posts: action.payload }
        default: return state;
    }
}