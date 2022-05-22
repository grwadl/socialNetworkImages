import React from 'react';
import { useSelector } from 'react-redux';
import cl from './Comment.module.scss';
import deleteBtn from '../../assets/delete.svg'
import $api from '../../http';
import user from '../../assets/userwebp.webp';
import { useNavigate } from 'react-router-dom';
const Comment = ({ login, avatar, text, deleteComm, id }) => {
    const userLogin = useSelector(state => state.AuthReducer.login);
    const dltComm = async () => {
        await deleteComm(id);
        await $api.delete('/post/comment/' + id)
    }
    const navigate = useNavigate();
    return (
        <div className={cl.comment}>
            <div className={cl.commentWrapper}>
                <div className={cl.avatarAndName}>
                    <div className={cl.avatarWrapper}><img src={avatar===''?user:avatar} alt="" /></div>
                    <div className={cl.login} onClick={e=>navigate('../profile/'+login,{replace:true})}>{login}</div>
                </div>
                <div className={cl.textWrapper}>
                    <div className={cl.text}>{text}</div>
                    {login === userLogin ? <img onClick={dltComm} src={deleteBtn}></img> : ''}
                </div>
            </div>
        </div>
    );
};

export default Comment;