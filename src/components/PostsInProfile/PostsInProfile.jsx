import React from 'react';
import user from '../../assets/userwebp.webp';
import cl from './PostsInProfile.module.scss';
import comms from '../../assets/comments.png'
import { useDispatch, useSelector } from 'react-redux';
import { setLike } from '../../hooks/useLikes';
import like from '../../assets/like.svg';
import like1 from '../../assets/like1.svg';
import { useNavigate } from 'react-router-dom';
import time from '../../assets/time.svg'
import { CHANGE_POST } from '../../redux/constants/constants';
import { store } from '../../redux/store/store';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const PostsInProfile = ({ photo, author, title,getDate, avatar,id,commsCount,creationTime }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navigatePost = () => {
        dispatch({type:CHANGE_POST, payload:id})
        navigate("../feed/" + id, { replace: true });
    }
    const index = store.getState().PostsInProfileReducer.posts.findIndex(x => x.id === id);
    const likes = useSelector(state => state.PostsInProfileReducer.posts[index].likesCount);
    const isliked = useSelector(state => state.PostsInProfileReducer.posts[index].isLikedByUser);
    let date = getDate(creationTime);
    const token = useSelector(state=>state.AuthReducer.token)
    return (
        <div className={cl.item} onClick={e=>navigatePost()}>
            <div className={cl.photo}><LazyLoadImage width='100%' height='160px' effect="blur" src={photo} alt="" /></div>
            <div className={cl.info}>
                <div className={cl.author}>{author}</div>
                <img className={cl.avatar}src={avatar===''?user:avatar} alt="" />
                <div className={cl.name}>{title}</div>
                <div className={cl.icons}>
                    <div className={cl.likebtn}><img onClick={e => { e.stopPropagation(); dispatch(setLike(id, token, index, 'profileItem')) }} src={isliked ? like1 : like} alt="" /><span className={cl.likesText}>{likes}</span></div>
                    <div className={cl.commsCount}><img src={comms} alt="" /><span className={cl.commsText}>{commsCount}</span></div>
            </div>
            </div>
            <div className={cl.time}><img src={time} alt="" />{String(date.date).split('.')[0]} {date.name}</div>
        </div>
    );
};

export default PostsInProfile;