import React from 'react';
import { useSelector } from 'react-redux';
import page404 from '../../assets/404page.png'
import cl from './Page404.module.scss';
import MyButton from '../../components/UI/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
const Page404 = () => {
    const isAuth = useSelector(state => state.AuthReducer.isAuth);
    const navigate = useNavigate();
    const redirect = (isAuth) => {
        if (isAuth) {
           return navigate('/', { replace: true });
        }
        return navigate('/login', { replace: true });
    }
    return (
        <div className={cl.page404}>
            <div className={cl.wrapper404}>
                <img src={page404} alt="" />
                <div className={cl.text404}>Seems like this page doesn't exist...</div>
                {isAuth ? <MyButton onClick={()=>redirect(true)}text='To main page'/>:<MyButton onClick={()=>redirect(false)} text='To login page'/>}
            </div>
        </div>
    );
};

export default Page404;