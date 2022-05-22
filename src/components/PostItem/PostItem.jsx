import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLike } from '../../hooks/useLikes';
import like from '../../assets/like.svg';
import like1 from '../../assets/like1.svg';
import cl from './PostItem.module.scss';
import { store } from '../../redux/store/store';
import { useNavigate } from 'react-router-dom';
import user from '../../assets/userwebp.webp';
import comms from '../../assets/comments.png';
import time from '../../assets/time.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CHANGE_POST } from '../../redux/constants/constants';
const PostItem = ({ photo, author, title, id,avatar,commsCount,creationTime, getDate }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.AuthReducer.token);
    const index = store.getState().AllPostsReducer.posts.findIndex(x => x.id === id);
    const likes = useSelector(state => state.AllPostsReducer.posts[index].likesCount);
    const isliked = useSelector(state => state.AllPostsReducer.posts[index].isLikedByUser);
    const navigate = useNavigate();
    const navigatePost = () => {
        dispatch({type:CHANGE_POST, payload:id})
        navigate("/feed/" + id, { replace: true });
    }
    let date = getDate(creationTime);
    return (
        <div className={cl.item} onClick={e=>navigatePost()}>
            <div className={cl.photo}><LazyLoadImage effect="blur" height='160px' width='100%' src={photo} alt="" /></div>
            <div className={cl.info}>
                <div className={cl.author} onClick={e => {
                    navigate('../profile/' + author, { replace: true });
                    e.stopPropagation();
                }}>{author}</div>
                <img className={cl.avatar}src={avatar===''?user:avatar} alt="" />
                <div className={cl.name}>{title}</div>
                <div className={cl.icons}>
                    <div className={cl.likebtn}><img onClick={e => { e.stopPropagation(); dispatch(setLike(id, token, index, 'all')) }} src={isliked ? like1 : like} alt="" /><span className={cl.likesText}>{likes}</span></div>
                    <div className={cl.commsCount}><img src={comms} alt="" /><span className={cl.commsText}>{commsCount}</span></div>
            </div>
            </div>
            <div className={cl.time}><img src={time} alt="" />{String(date.date).split('.')[0]} {date.name}</div>
        </div>
    );
};

export default PostItem;