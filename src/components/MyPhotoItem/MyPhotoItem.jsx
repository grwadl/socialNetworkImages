import React from 'react';
import like from '../../assets/like.svg';
import like1 from '../../assets/like1.svg';
import cl from './MyPhotoItem.module.scss';
import deletebtn from '../../assets/delete.svg';
import { CHANGE_POST} from '../../redux/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLike } from '../../hooks/useLikes';
import { store } from '../../redux/store/store';
import user from '../../assets/userwebp.webp';
import useToken from '../../hooks/useToken.js';
import { useNavigate } from 'react-router-dom';
import comms from '../../assets/comments.png';
import time from '../../assets/time.svg';
import { MyApi } from '../../API/API';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const MyPhotoItem = ({ title, photo, author, id,avatar, commsCount,getDate,creationTime,hidden}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.AuthReducer.token);
    const index = store.getState().MyPostsReducer.posts.findIndex(x => x.id === id);
    const likes = useSelector(state => state.MyPostsReducer.posts[index].likesCount);
    const isliked = useSelector(state => state.MyPostsReducer.posts[index].isLikedByUser);
    const navigate = useNavigate();
    const navigatePost = () => {
        dispatch({type:CHANGE_POST, payload:id})
        navigate("../feed/" + id, { replace: true });
    }
    const posts = useSelector(state => state.MyPostsReducer.posts);
    let date = getDate(creationTime);
    useToken();
    return (
        <div className={hidden?cl.hidden:cl.item} onClick={e=>navigatePost()}>
            <div className={cl.photo}><LazyLoadImage effect="blur" height='160px' width='100%' src={photo} alt="" /></div>
            <div className={cl.info}>
            <img className={cl.avatar}src={avatar===''?user:avatar} alt="" />
                <div className={cl.author}>{author}</div>
                <div className={cl.name}>{title}</div>
            </div>
            <div className={cl.icons}>
                <div className={cl.likebtn}><img onClick={e => { dispatch(setLike(id, token, index, 'my')); e.stopPropagation() }} src={isliked ? like1 : like} alt="" /><span className={cl.likesText}>{likes}</span></div>
                <div className={cl.commIcon}><img src={comms} alt="" /><span className={cl.commText}> {commsCount}</span></div>
                <div className={cl.deletebtn}><img src={deletebtn} alt="delete" onClick={e => { e.stopPropagation(); dispatch(MyApi.deletePost(id,posts)) }} /></div>
            </div>
            <div className={cl.time}><img src={time} alt="" />{String(date.date).split('.')[0]} {date.name}</div>
        </div>
    );
};

export default MyPhotoItem;