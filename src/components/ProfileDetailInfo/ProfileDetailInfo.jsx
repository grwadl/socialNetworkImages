import React from 'react';
import cl from './ProfileDetailInfo.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import user from '../../assets/userwebp.webp';
const ProfileDetailInfo = ({ props }) => {
    return (
        <div className={cl.detailInfo}>
            <div className={cl.detailInfoWrapper}>
                <div className={cl.imgWrapper}><LazyLoadImage width='100%' height='100%' effect="blur" src={props.avatar===''?user:props.avatar} /></div>
                <div className={cl.addInfo}>
                    <div className={cl.login}>{props.login}</div>
                    <div className={cl.date}>Registration date: {String(new Date(props.registrationDate)).split('GMT')[0]}</div>
                    <div className={cl.postTotal}>Total posts: {props.postsTotal}</div>
                    <div className={cl.likesTotal}>Total likes: {props.likesTotal}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetailInfo;