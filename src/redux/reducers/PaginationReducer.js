import { CHANGE_FEED_PAGE, CHANGE_MY_PAGE, SET_PROFILE_PAGE, SET_TOTAL_FEED_PAGE, SET_TOTAL_MY_PAGE, SET_TOTAL_PROFILE_PAGE } from "../constants/constants";


const defaultState = {
    feedPage: 1,
    MyPage: 1,
    totalFeed: 0,
    totalMy: 0,
    totalProfileById:0,
    profileByIdPage:1
}
export const PaginationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_MY_PAGE: return { ...state, MyPage: action.payload }
        case CHANGE_FEED_PAGE: return { ...state, feedPage: action.payload }
        case SET_TOTAL_FEED_PAGE: return { ...state, totalFeed: action.payload }
        case SET_TOTAL_MY_PAGE: return { ...state, totalMy: action.payload }
        case SET_TOTAL_PROFILE_PAGE: return { ...state, totalProfileById: action.payload }
        case SET_PROFILE_PAGE: return { ...state, profileByIdPage: action.payload }
        default: return state;
    }
}