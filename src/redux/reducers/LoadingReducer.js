import {  END_LOADING_ALL_POSTS, END_LOADING_AUTH, END_LOADING_ID_POST, END_LOADING_MY_POSTS, END_LOADING_PROFILE, START_LOADING_ALL_POSTS, START_LOADING_AUTH, START_LOADING_ID_POST, START_LOADING_MY_POSTS, START_LOADING_PROFILE, STOP_LOADING_ALL} from "../constants/constants";

const defaultState = {
    loadingAuth: true,
    loadingAllPosts: false,
    loadingMyPosts: false,
    loadingId: false,
    loadingProfile:false,
}
export const LoadingReducer = (state = defaultState, action) => {
    switch (action.type) {
        case START_LOADING_ALL_POSTS: return { ...state, loadingAllPosts: true }
        case END_LOADING_ALL_POSTS: return { ...state, loadingAllPosts: false }
        case START_LOADING_MY_POSTS: return { ...state, loadingMyPosts: true }
        case END_LOADING_MY_POSTS: return { ...state, loadingMyPosts: false }
        case START_LOADING_AUTH: return { ...state, loadingAuth: true }
        case END_LOADING_AUTH: return { ...state, loadingAuth: false }
        case START_LOADING_ID_POST: return { ...state, loadingId: true }
        case END_LOADING_ID_POST: return { ...state, loadingId: false }
        case START_LOADING_PROFILE: return { ...state, loadingProfile: true }
        case END_LOADING_PROFILE: return { ...state, loadingProfile: false }
        case STOP_LOADING_ALL: return {...state,loadingProfile:false,loadingAllPosts: false,loadingAuth: false,loadingMyPosts: false,loadingId:false}
        default: return state;
    }
}