import { LIKE_POSTS, LOAD_POSTS} from "../constants/constants";

const defaultState = {
    posts: []
}
export const AllPostsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_POSTS: return { ...state, posts: action.payload }
        case LIKE_POSTS: return { ...state, posts: action.payload }
        default: return state;
    }
}