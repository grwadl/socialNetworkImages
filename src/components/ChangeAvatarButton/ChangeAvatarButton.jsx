import React from 'react';
import cl from './ChangeAvatarButton.module.scss';
import MyButton from '../UI/MyButton/MyButton';
import { useDispatch } from 'react-redux';
import { CLOSE_AVATAR_MENU, LOGOUT, OPEN_AVATAR_MODAL } from '../../redux/constants/constants';
import { Link, useNavigate } from 'react-router-dom';
const ChangeAvatarButton = () => {
    const dispatch = useDispatch();
    const openAvatarModal = e => {
        dispatch({ type: CLOSE_AVATAR_MENU });
        e.stopPropagation();
        dispatch({ type: OPEN_AVATAR_MODAL });
    }
    const navigate = useNavigate();
    const logOut = () => {
        dispatch({ type: LOGOUT});
        localStorage.removeItem('Userdata');
        navigate('/login')
    }
    return (
        <div className={cl.wrapper}>
            <MyButton text='Change avatar' onClick={e => openAvatarModal(e)} />
            <MyButton text='Log out'onClick={() => logOut()}>dssdgsdgsdgdgs</MyButton>
        </div>
    );
};

export default ChangeAvatarButton;