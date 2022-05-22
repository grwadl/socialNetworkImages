import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MyApi } from "../API/API";
import $api from "../http";
import { CHANGE_MY_PAGE } from "../redux/constants/constants";

export const useMyPhoto = (login, pageNum,setDetailedInfo) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(MyApi.getMyPhotos(login, pageNum));
        $api.get('/user/' + login).then(res => setDetailedInfo(res.data));
        return ()=> dispatch({type:CHANGE_MY_PAGE, payload:1})
    }, [pageNum]);
}