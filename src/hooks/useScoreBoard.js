import { useDispatch } from "react-redux";
import { MyApi } from "../API/API";
import { CHANGE_FEED_PAGE } from "../redux/constants/constants";
import  { useEffect } from 'react';
export const useScoreBoard = (setScoreBoard) => {
    const dispatch = useDispatch();
    useEffect(() => {
        MyApi.getScoreBoard(dispatch,setScoreBoard);
        return ()=> dispatch({type:CHANGE_FEED_PAGE, payload:1})
    }, []);
}