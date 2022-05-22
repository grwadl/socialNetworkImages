import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import cl from './AuthPage.module.scss';
import logo from '../../assets/logo.svg';
import MyButton from '../../components/UI/MyButton/MyButton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MyApi } from '../../API/API';
import { validationSchema } from './ValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import MyEmail from '../../components/UI/MyEmail/MyEmail';
import MyPassword from '../../components/UI/MyPassword/MyPassword';
const AuthPage = () => {
    const formOptions = { resolver: yupResolver(validationSchema), mode: 'all' };
    const { register, handleSubmit, formState: { errors, isValid } } = useForm(formOptions);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        await dispatch(MyApi.addToken(data));
        navigate('../', { replace: true });
    }
    const errorsAuth = useSelector(state => state.ErrorsReducer.loginErrors);
    const [passwordShown, setPasswordShown] = useState({ Password: false, RepeatedPassword: false });
    return (
        <div className={cl.authPage}>
            <div className={cl.authPageWrapper}>
                <div className={cl.IMG}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={cl.title}>Sign In</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MyEmail errors={errors} register={register} type='Login' typeSubmit='auth' />
                    <MyPassword passwordShown={passwordShown} setPasswordShown={setPasswordShown} type='Password' register={register} errors={errors} />
                    <MyButton disabled={!isValid} text='Login' type='submit' />
                    {errorsAuth.length !==0&&errorsAuth!==undefined ? <div className={cl.authErrorBlock}>{errorsAuth}</div> : ''} 
                    <div className={cl.linkWrapper}>
                        <Link to='/registration'>Don't have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;