import React, { useEffect } from 'react';
import cl from './ToolBar.module.scss';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import myphoto from '../../assets/myphoto.svg';
import home from '../../assets/home.svg';
import faq from '../../assets/faq.svg';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_PAGE, TOGGLE_MENU_CLOSE, TOGGLE_MENU_OPEN } from '../../redux/constants/constants';
import { store } from '../../redux/store/store';
import { useLocation } from "react-router-dom";
import ProfileInfo from '../ProfileInfo/ProfileInfo';
const ToolBar = () => {
    const dispatch = useDispatch();
    const links = [{ name: 'My profile', to: '', img: myphoto }, { name: 'Main', to: 'feed', img: home }, { name: 'FAQ', to: 'faq', img: faq }];
    const history = useLocation();
    useEffect(() => {
        console.log(history.pathname.split('/')[1])
        links.forEach(item => {
            if (item.to == history.pathname|| item.to==history.pathname.split('/')[1]) {
                dispatch({
                    type: CHANGE_PAGE, payload: item.name
                });
                if (history.pathname === '/') {
                    dispatch({
                        type: CHANGE_PAGE, payload: 'My profile'
                    })
                }
            }
        })
    }, [history.pathname]);
    const activePage = useSelector(state => state.CurrentPageReducer.current);
    const openMenu = useSelector(state => state.BurgerMenuReducer.active);
    const login = useSelector(state => state.AuthReducer.login);
    const avatar = useSelector(state => state.AuthReducer.avatar);
    const toggleMenu = () => {
        store.getState().BurgerMenuReducer.active
            ? dispatch({ type: TOGGLE_MENU_CLOSE })
            : dispatch({ type: TOGGLE_MENU_OPEN });
        document.body.classList.remove('active');
        }
    return (
        <div className={openMenu ? cl.toolBar + ' ' + cl.active : cl.toolBar}>
            <span className={cl.burgerMenu} onClick={e=>toggleMenu()}></span>
            <div className={cl.logo}><img src={logo} alt="alt" /></div>
            <div className={cl.links}>
                {links.map(item => <Link to={item.to} className={cl.superWrapper} onClick={() => { dispatch({ type: CHANGE_PAGE, payload: item.name });toggleMenu() }} key={item.to}><div className={item.name == activePage ? cl.linkWrapper + ' ' + cl.activeLinkWrapper : cl.linkWrapper}><img src={item.img} alt="" />
                    {item.name}</div></Link>
                )}
                <div className={cl.profileInfoToggled}><ProfileInfo login={login} avatar={avatar}/></div>
            </div>
        </div>
    );
};

export default ToolBar;