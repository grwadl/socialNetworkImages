import React, { useState } from 'react';
import cl from './ProfileInfo.module.scss';
import user from '../../assets/userwebp.webp';
import MyButton from '../UI/MyButton/MyButton';
import { useDispatch } from 'react-redux';
import { LOGOUT, OPEN_AVATAR_MODAL, TOGGLE_MENU_CLOSE, TOGGLE_MENU_OPEN } from '../../redux/constants/constants';
import { store } from '../../redux/store/store';
const ProfileInfo = ({ login, avatar }) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const dispatch = useDispatch();
    const toggleMenu = (e) => {
        store.getState().BurgerMenuReducer.active
            ? dispatch({ type: TOGGLE_MENU_CLOSE })
            : dispatch({ type: TOGGLE_MENU_OPEN });
        dispatch({ type: OPEN_AVATAR_MODAL });
        document.body.classList.remove('active');
    }
    const logOut = (e) => {
        store.getState().BurgerMenuReducer.active
            ? dispatch({ type: TOGGLE_MENU_CLOSE })
            : dispatch({ type: TOGGLE_MENU_OPEN });
        dispatch({ type: LOGOUT });
        localStorage.removeItem('Userdata')
        document.body.classList.remove('active');
        }
    return (
        <div className={cl.profileInfo} onClick={e=>setIsOpenMenu(!isOpenMenu)}>
        <div className={cl.avatarNname}><img src={avatar===''?user:avatar} alt="" />
                <div className={isOpenMenu?cl.profileName+' '+cl.openMenu: cl.profileName}><div>{login}</div></div>
        </div>
            <div className={cl.modalChangeAvatar}></div>
            {isOpenMenu ?
                <div className={cl.addAvatar} >
                    <div className={cl.padder}></div>
                    <MyButton onClick={e => toggleMenu(e)} text='Change Avatar' />
                    <MyButton onClick={logOut}text='Log out'/>
                </div>
            : ''}
    </div>
    );
};

export default ProfileInfo;