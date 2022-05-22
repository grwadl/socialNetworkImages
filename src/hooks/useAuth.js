import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux";
import $api from "../http";
import { END_LOADING_AUTH, LOGIN, LOGOUT } from "../redux/constants/constants";
export const useAuth = () => {
    const dispatch = useDispatch();
    const login = useCallback((token) => {
        return dispatch => {
            $api.get('/user').then(res => dispatch({ type: LOGIN, payload: { token, login: res.data.login,avatar:res.data.avatar } })).then(() => dispatch({ type: END_LOADING_AUTH }))
                .then(() => localStorage.setItem('Userdata', JSON.stringify(token))).catch(e => {
                    logout();
                    throw e;
                });

        }
    }, [])
    const againLogin = (token) => {
        dispatch(login(token))
    }
    const logout = () => {
        dispatch({ type: LOGOUT });
        localStorage.removeItem('Userdata');
        dispatch({ type: END_LOADING_AUTH });
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Userdata'));
        data ? againLogin(data) : logout();
    }, [])
}