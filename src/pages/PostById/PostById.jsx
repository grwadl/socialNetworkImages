import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useToken from '../../hooks/useToken';
import cl from './PostById.module.scss';
import Loader from '../../components/Loader/Loader';
import { usePostById } from '../../hooks/usePostById';
import user from '../../assets/userwebp.webp';
import AvatarModal from '../../components/AvatarModal/AvatarModal';
import $api from '../../http';
import Comment from '../../components/Comment/Comment';
import MyButton from '../../components/UI/MyButton/MyButton';
import views from '.././../assets/views.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const PostById = () => {
    useToken();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    usePostById(setPost, setComments);
    const isLoading = useSelector(state => state.LoadingReducer.loadingId);
    const postId = useSelector(state => state.CurrentPageReducer.postId);
    const avatar = useSelector(state => state.AuthReducer.avatar);
    const login = useSelector(state => state.AuthReducer.login);
    const uploadComment = async () => {
        await $api.post('/post/comment', { text, postId }).then(res => avatar === '' ? setComments([{ text: text, creatorAvatar: user, creatorLogin: login, id: res.data.id }, ...comments]) : setComments([{ text: text, creatorAvatar: avatar, creatorLogin: login, id: res.data.id }, ...comments]));
        setText('');
    }
    const deleteComm = (id) => {
        const comms = comments.filter(c => c.id !== id);
        setComments(comms);
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className={cl.post}>
            <AvatarModal />
            <div className={cl.postWrapper}>
                <div className={cl.imgWrapper}>
                    <LazyLoadImage effect="blur" maxWidth='100%' maxHeight='100%' src={post.photo} alt="img" />
                </div>
                <div className={cl.textWrapper}>
                    <div className={cl.imgName}>{post.title}</div>
                    <div className={cl.postAuthor}>
                        <div className={cl.views}>
                            <div className={cl.viewsWrapper}><img src={views} alt="" /><span>{post.viewsCount}</span></div>
                        </div>
                        <img src={post.creatorAvatar === '' ? user : post.creatorAvatar} alt="avatar" />
                        <span className={cl.authorName}>{post.creatorLogin}</span>
                        <div className={cl.description}>{post.description}</div>
                    </div>
                </div>
                <div className={cl.comments}>
                    <div className={cl.commentsTitle}>Comments</div>
                    <div className={cl.commentsInput}><input type='text' value={text}onChange={e => setText(e.target.value)} /></div>
                    <MyButton onClick={uploadComment} text='Set Comment'/>
                    <div className={cl.commentsList}>{comments.map(comment => <Comment id={comment.id} key={comment.id}deleteComm={deleteComm}text={comment.text} login={comment.creatorLogin} avatar={comment.creatorAvatar} />)}</div>
                </div>
            </div>
        </div>
    );
};

export default PostById;