import React, { useState,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE } from '../../redux/constants/constants';
import MyButton from '../UI/MyButton/MyButton';
import cl from './ModalAdd.module.scss';
import useToken from '../../hooks/useToken.js';
import { MyApi } from '../../API/API';
const ModalAdd = () => {
    useToken();
    const [file, setFile] = useState({});
    const [input, setInput] = useState('');
    const isValidated = useMemo(() => {
        if (input.split('').length > 15|| input.split('').length===0) {
            return false;
        }
        return true;
    }, [input]);
    const [description, setDescription] = useState('');
    const uploadFile = (file) => {
        setFile(file);
    }
    const dispatch = useDispatch();
    const active = useSelector(state => state.ModalReducer.active);
    const login = useSelector(state => state.AuthReducer.login);
    const pageNum = useSelector(state => state.PaginationReducer.MyPage);
    const confirmSend = async () => {
        dispatch(MyApi.sendFile(input, file, description, login,pageNum))
        dispatch({ type: CLOSE });
    }
    return (
        <div className={active ? cl.modal + ' ' + cl.active : cl.modal}>
            <div className={cl.closeButton} onClick={e => dispatch({ type: CLOSE })}></div>
            <div className={cl.modalWrapper}>
                <label className={cl.setPostLabel}>Name</label>
                <input type='text' className={cl.setPost} value={input} onChange={e => setInput(e.target.value)}></input>
                <label className={cl.setPostLabel}>Description</label>
                <input type='text' className={cl.setPost} value={description}onChange={e => setDescription(e.target.value)}></input>
                <input type="file" accept='.jpeg,.jpg,.png' className={cl.setImage} onChange={e => uploadFile(e.target.files[0])} />
                {!isValidated ?<div className={cl.error}>The title should be longer than 0 and shorter than 15! Image is required!</div>:''}
                <MyButton disabled={!isValidated}text='Confirm' onClick={e => confirmSend()} />
            </div>
        </div>
    );
};

export default ModalAdd;