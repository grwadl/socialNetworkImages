import React from 'react';
import Navbar from '../../components/NavBar/NavBar';
import { Outlet} from 'react-router-dom';
import cl from './MainPage.module.scss';
import ToolBar from '../../components/ToolBar/ToolBar';
import { useSelector } from 'react-redux';
const MainPage = () => {
    const isAuth = useSelector(state => state.AuthReducer.isAuth);
    return (
        <div className={cl.mainPage}>
            <div className={cl.mainPageWrapper}>
                {isAuth?<ToolBar />:''}
                <div className={cl.mainSection}> 
                {isAuth?<Navbar />:''}    
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default MainPage;