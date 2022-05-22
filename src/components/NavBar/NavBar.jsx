import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cl from './NavBar.module.scss';
import user from '../../assets/userwebp.webp';
import './MenuBurger.scss';
import { store } from '../../redux/store/store';
import { CLOSE_AVATAR_MENU, OPEN_AVATAR_MENU, TOGGLE_MENU_CLOSE, TOGGLE_MENU_OPEN } from '../../redux/constants/constants';
import ChangeAvatarButton from '../ChangeAvatarButton/ChangeAvatarButton';
const NavBar = () => {
    const login = useSelector(state => state.AuthReducer.login);
    const dispatch = useDispatch();
    const currentNamePage = useSelector(state => state.CurrentPageReducer.current);
    const openMenu = useSelector(state => state.BurgerMenuReducer.active);
    const toggleMenu = () => {
        store.getState().BurgerMenuReducer.active
            ? dispatch({ type: TOGGLE_MENU_CLOSE })
            : dispatch({ type: TOGGLE_MENU_OPEN });
        document.body.classList.add('active');
    }

    const isOpenMenu = useSelector(state => state.AddAvatarReducer.active);
    const toggleAvatarMenu = () => {
        store.getState().AddAvatarReducer.active ? dispatch({ type: CLOSE_AVATAR_MENU }) : dispatch({ type: OPEN_AVATAR_MENU })
    }
    const imgAvatar = useSelector(state=>state.AuthReducer.avatar);
    return (
        <nav>
            <div className={cl.navWrapper}>
                <div className={openMenu ? 'menu-burger__header open-menu' : 'menu-burger__header'} onClick={e => toggleMenu()}>
                    <span></span>
                </div>
                <div className={cl.title}>{currentNamePage}</div>
                <div className={cl.profileInfo}>
                    <div onClick={toggleAvatarMenu}>
                        <div className={isOpenMenu ? cl.avatarNname + ' ' + cl.openMenu : cl.avatarNname} ><img src={imgAvatar===''? user:imgAvatar} alt="" />
                            {isOpenMenu ? <ChangeAvatarButton /> : ''}
                            <div className={cl.profileName}>{login}</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;