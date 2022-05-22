import axios from "axios";
import { LIKE_POSTS, LIKE_PROFILE, LOGOUT } from "../redux/constants/constants";
import { store } from "../redux/store/store";

export const setLike = (id, token, index, type) => {
    return dispatch => {
        let posts; let postOther;
        if (type === 'my') {
            posts = store.getState().MyPostsReducer.posts
        } else if (type === 'profileItem') {
            posts = store.getState().PostsInProfileReducer.posts;
        } else {
            posts = store.getState().AllPostsReducer.posts
        }
        const likedPost = posts.find(item => item.id === id);
        if (likedPost.isLikedByUser) {
            likedPost.isLikedByUser = !likedPost.isLikedByUser;
            likedPost.likesCount -= 1;
            posts[index] = likedPost;
            dispatch({ type: LIKE_POSTS, payload: posts });

        }
        else {
            likedPost.isLikedByUser = !likedPost.isLikedByUser;
            likedPost.likesCount += 1;
            posts[index] = likedPost;
            dispatch({ type: LIKE_POSTS, payload: posts });

        }
        axios.put('https://photoa.azurewebsites.net/api/post/like/' + id, {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).catch(e => {
            if (e.response.status == 401) {
                dispatch({ type: LOGOUT });
            }
        });
    }
}