import axios from "axios";
import $api from "../http";
import {
    ADD_POST,
    CHANGE_MY_PAGE,
    END_LOADING_ALL_POSTS,
    END_LOADING_AUTH,
    END_LOADING_ID_POST,
    END_LOADING_MY_POSTS,
    END_LOADING_PROFILE,
    GET_DETAILED_INFO_PROFILE,
    GET_POSTS_IN_PROFILE,
    LOAD_POSTS,
    LOGIN,
    SET_LOGIN_ERR,
    SET_TOTAL_FEED_PAGE,
    SET_TOTAL_MY_PAGE,
    START_LOADING_ALL_POSTS,
    START_LOADING_AUTH,
    START_LOADING_MY_POSTS,
    START_LOADING_PROFILE,
} from "../redux/constants/constants";
import {
    store
} from "../redux/store/store";
export class MyApi {
    static getMyPhotos = (login, pageNum) => {
        return dispatch => {
            dispatch({ type: CHANGE_MY_PAGE, payload: pageNum });
            dispatch({
                type: START_LOADING_MY_POSTS
            });
            dispatch({ type: START_LOADING_PROFILE })
            $api.get('/post/list/' + login, {
                params: {
                    pageNum,
                    pageSize: 12
                }
            }).then(res => {
                dispatch({
                    type: ADD_POST,
                    payload: res.data.posts
                });
                dispatch({ type: SET_TOTAL_MY_PAGE, payload: res.data.totalPages })
            }).then(() => {
                dispatch({
                    type: END_LOADING_PROFILE
                }); dispatch({ type: END_LOADING_MY_POSTS })
            }).catch(e => {
                dispatch({
                    type: END_LOADING_PROFILE
                }); dispatch({ type: END_LOADING_MY_POSTS })
            });
        }
    }
    static deletePost = (id, posts) => {
        const newPosts = posts.filter(p => p.id !== id);
        return dispatch => {
            dispatch({
                type: ADD_POST,
                payload: newPosts
            })
            $api.delete(`/post/${id}`).catch(e => console.log(e));
        }
    }
    static addToken = (data) => {
        return dispatch => {
            dispatch({
                type: START_LOADING_AUTH
            });
            axios.post('https://photoa.azurewebsites.net/api/user/login', {
                ...data
            })
                .then(res => {
                    console.log(res);
                    dispatch({
                        type: LOGIN,
                        payload: res.data
                    })
                }
                )
                .then(() =>
                    localStorage.setItem('Userdata', JSON.stringify(store.getState().AuthReducer.token)))
                .then(() => {
                    dispatch({
                        type: END_LOADING_AUTH
                    });
                    dispatch({type:SET_LOGIN_ERR,payload:""})
                })
                .catch(e => {
                    console.log(e);
                    dispatch({
                        type: END_LOADING_AUTH
                    });
                    dispatch({type:SET_LOGIN_ERR,payload:e.response.data.errorText})
                });
        }
    }
    static fetchAllPosts = (pageNum) => {
        return dispatch => {
            dispatch({
                type: START_LOADING_ALL_POSTS
            });
            $api.get('/post/list', {
                params: {
                    pageNum,
                    pageSize: 12
                }
            }).then(res => {
                dispatch({
                    type: LOAD_POSTS,
                    payload: res.data.posts
                });
                dispatch({ type: SET_TOTAL_FEED_PAGE, payload: res.data.totalPages });
            }).then(() => dispatch({
                type: END_LOADING_ALL_POSTS
            })).catch(e => dispatch({
                type: END_LOADING_ALL_POSTS
            }));
        }
    }
    static sendFile = (post, file, description, login, pageNum) => {
        return dispatch => {
            dispatch({ type: START_LOADING_MY_POSTS })
            let form_data = new FormData();
            form_data.append("title", String(post));
            form_data.append("file", file);
            form_data.append("description", description);
                $api.post('/post', form_data).then(() => $api.get('/post/list/' + login, {
                    params: {
                        pageNum,
                        pageSize: 12
                    }
                })).catch((e) =>{
                    alert('The max size of image is 3mb');
                    dispatch({ type: END_LOADING_MY_POSTS })
                }).then(res => {
                    dispatch({
                        type: ADD_POST,
                        payload: res.data.posts
                    }); dispatch({ type: SET_TOTAL_MY_PAGE, payload: res.data.totalPostsCount })
                }).then(() => dispatch({ type: END_LOADING_MY_POSTS }));
            
        }
    }
    static getPostById = (dispatch, setPost, setComments) => {
        $api.get('/post/' + store.getState().CurrentPageReducer.postId).then(res => { setPost(res.data.post); setComments(res.data.comments) })
            .then(() => dispatch({
                type: END_LOADING_ID_POST
            })).catch(e => dispatch({
                type: END_LOADING_ID_POST
            }))
    }
    static addAvatar = (file, login) => {
        const form_data = new FormData();
        form_data.append("file", file);
        form_data.append("login", login);
        $api.post('/user/avatar', form_data).catch(e => alert('Max size of the image is 2mb'));
    }
    static getProfileInfo = (login, pageNum) => {
        return dispatch => {
            $api.get('/user/' + login).then(res => dispatch({ type: GET_DETAILED_INFO_PROFILE, payload: res.data }));
            $api.get('/post/list/' + login, {
                params: {
                    pageNum,
                    pageSize: 12
                }
            }).then(res => { dispatch({ type: GET_POSTS_IN_PROFILE, payload: res.data }); dispatch({ type: END_LOADING_PROFILE }) })
        }

    }
    static getScoreBoard = async (dispatch, setScoreBoard) => {
        dispatch({ type: START_LOADING_ALL_POSTS })
        await $api.get('/scoreboard',).then(res => setScoreBoard(res.data)).then(() => dispatch({ type: END_LOADING_ALL_POSTS })).catch(e=>console.log(e));
    }
}