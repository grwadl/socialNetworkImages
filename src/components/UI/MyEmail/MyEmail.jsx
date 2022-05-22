import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOGIN_ERR, SET_REG_ERR } from '../../../redux/constants/constants';
import cl from './MyEmail.module.scss'
const MyEmail = ({ errors, register, type,typeSubmit }) => {
    const dispatch = useDispatch();
    const errorsSubmit = useSelector(state => typeSubmit === 'reg' ? state.ErrorsReducer.regErrors : state.ErrorsReducer.loginErrors);
    return (
        <div className={cl.inputWrapperForm}>
            <input className={cl.emailInput}onClick={() => dispatch({ type:typeSubmit==='reg'?SET_REG_ERR:SET_LOGIN_ERR, payload: '' })} placeholder={'' + type} name={'' + type} {...register(`${type}`)} />
            {errors[type] !== undefined ? <div className={cl.error}>{errors && errors[type].message}</div>:''}
            {errorsSubmit[type]!==undefined? <div className={cl.error}>{errorsSubmit[type][0]}</div>:''}
        </div>
    );
};

export default MyEmail;