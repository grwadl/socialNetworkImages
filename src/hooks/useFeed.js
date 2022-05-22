import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MyApi } from "../API/API";

export const useFeed = (pageNum) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(MyApi.fetchAllPosts(pageNum));
    }, [pageNum]);
}