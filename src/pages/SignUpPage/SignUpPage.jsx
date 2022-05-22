import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import cl from './SignUpPage.module.scss';
import logo from '../../assets/logo.svg';
import MyButton from '../../components/UI/MyButton/MyButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom';
import MyEmail from '../../components/UI/MyEmail/MyEmail';
import axios from 'axios';
import { SET_REG_ERR } from '../../redux/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import MyPassword from '../../components/UI/MyPassword/MyPassword';
import { validationSchema } from './ValidationSchema';

const formOptions = { resolver: yupResolver(validationSchema), mode: 'all' };
const SignUpPage = () => { 
    const { register, handleSubmit, formState: { errors, isValid } } = useForm(formOptions);
    const [passwordShown, setPasswordShown] = useState({Password:false,RepeatedPassword:false});
    const dispatch = useDispatch();
   const onSubmitReg = (data) => {
            axios.post('https://photoa.azurewebsites.net/api/user/register', {
                ...data
            }).then(()=>alert('Succes! Now confirm your email!')).catch(e => dispatch({ type: SET_REG_ERR, payload: e.response.data }));
    }
    const isAuth = useSelector(state => state.AuthReducer.isAuth);
    return (
        <div className={cl.authPage}>
            <div className={cl.authPageWrapper}>
                <div className={cl.IMG}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={cl.title}>Sign In</div>
                <form onSubmit={handleSubmit(onSubmitReg)}>
                    <MyEmail errors={errors} register={register} type='Email'  typeSubmit='reg'/>
                    <MyEmail errors={errors} register={register} type='Login'  typeSubmit='reg'/>
                    <MyPassword passwordShown={passwordShown} setPasswordShown={setPasswordShown} type='Password' register={register} errors={errors} />
                    <MyPassword passwordShown={passwordShown} setPasswordShown={setPasswordShown} type='RepeatedPassword' register={register} errors={errors} />
                    <MyButton disabled={!isValid} text='Login' type='submit' />
                    <div className={cl.linkWrapper}>
                        <Link to='/login'>Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;