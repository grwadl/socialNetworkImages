import {DESTROY_PROFILE, GET_DETAILED_INFO_PROFILE, GET_POSTS_IN_PROFILE, LIKE_POSTS} from "../constants/constants";

const defaultState = {
    posts: [],
    totalPages: 0,
    detailedInfo:[]
}
export const PostsInProfileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_POSTS_IN_PROFILE: return { ...state, posts: action.payload.posts, totalPages:action.payload.totalPages}
        case GET_DETAILED_INFO_PROFILE: return { ...state, detailedInfo: action.payload }
        case LIKE_POSTS: return { ...state, posts: action.payload }
        case DESTROY_PROFILE: return {...state, posts:[],detailedInfo:{},totalPages:0}
        default: return state;
    }
}