import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, STOP_LOADING_ALL } from "../redux/constants/constants";

const useToken = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state=>state.AuthReducer.isAuth)
    const token = useSelector(state=>state.AuthReducer.token)
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Userdata'));
        if (data !== token||!data) {
            alert('Ваша сессия истекла')
            dispatch({ type: LOGOUT });
            dispatch({ type: STOP_LOADING_ALL });
        }
    },[])
}
export default useToken;