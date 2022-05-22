import React, { useState,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyApi } from '../../API/API';
import { CHANGE_AVATAR, CLOSE_AVATAR_MODAL, LOGIN } from '../../redux/constants/constants';
import MyButton from '../UI/MyButton/MyButton';
import cl from './AvatarModal.module.scss';
const AvatarModal = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState({});
    const login = useSelector(state => state.AuthReducer.login);
    const active = useSelector(state => state.AddAvatarReducer.openModal);
    const confirmSend = () => {
        dispatch({ type: CLOSE_AVATAR_MODAL });
        const imgUrl = URL.createObjectURL(file);
        MyApi.addAvatar(file,login);
        dispatch({ type: CHANGE_AVATAR, payload: imgUrl });
    }
    const uploadFile = async (item) => {
        setFile(item);
    }
    return (
        <div className={active ? cl.modal + ' ' + cl.active : cl.modal}>
            <div className={cl.closeButton} onClick={e => dispatch({ type: CLOSE_AVATAR_MODAL })}></div>
            <div className={cl.modalWrapper}>
                <label className={cl.setPostLabel}>Avatar</label>
                <input type="file" accept='.jpeg,.jpg,.png'className={cl.setImage} onChange={e => uploadFile(e.target.files[0])} />
                <MyButton text='Confirm' onClick={e => confirmSend()} />
            </div>
        </div>
    );
};

export default AvatarModal;