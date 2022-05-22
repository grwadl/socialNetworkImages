import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { MyApi } from "../API/API";
import { CHANGE_POST, START_LOADING_ID_POST } from "../redux/constants/constants";

export const usePostById = (setPost,setComments) => {
    const dispatch = useDispatch();
    const history = useLocation();
    useEffect(() => {
        dispatch({ type: START_LOADING_ID_POST });
        dispatch({ type: CHANGE_POST, payload: history.pathname.split('/feed/')[1] })
        MyApi.getPostById(dispatch, setPost,setComments);
    }, []);
}