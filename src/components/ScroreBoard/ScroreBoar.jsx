import React, { useMemo } from 'react';
import cl from './ScoreBoard.module.scss';
import views from '../../assets/views.svg';
import dateTime from '../../assets/time.svg';
import MyButton from '../UI/MyButton/MyButton';
import user1 from '../../assets/userwebp.webp'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CHANGE_POST } from '../../redux/constants/constants';
import likes from '../../assets/like.svg';
import photo from '../../assets/photo.svg';
import user from '../../assets/userwebp.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const ScoreBoard = ({ post1, users }) => {
    const date = useMemo(() => {
        const zone = new Date().getTimezoneOffset();
        const dateCreation = new Date().getTime() + (zone * 60000) - new Date(post1.creationTime).getTime();
        const minutes = dateCreation / 60000;
        const hours = minutes / 60;
        const days = hours / 24;
        const month = days / 30;
        if (minutes < 1) {
            return { date: 1, name: 'minutes' }
        }
        const dateArray = [{ date: minutes, name: 'minutes' }, { date: hours, name: 'hours' }, { date: days, name: 'days' }, { date: month, name: 'month' }]
        const newDateArray = dateArray.filter(e => e.date > 1).reverse();
        return newDateArray[0];
    }, [post1.creationTime]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigatePost = () => {
        dispatch({ type: CHANGE_POST, payload: post1.id })
        navigate("/feed/" + post1.id, { replace: true });
    }
    return (
        <div className={cl.scoreboardWrapper}>
            <div className={cl.scoreBoardTitle}>The most popular post!</div>
            <div className={cl.scoreboard}>
                <div className={cl.likedPost}>
                    <div className={cl.likedPostImg}><LazyLoadImage maxHeight='336px' width='100%' effect="blur" src={post1.photo===''?user:post1.photo} alt="" /></div>
                    <div className={cl.likedPostInfo}>
                        <div className={cl.postName}>{post1.title} <MyButton text='Watch' onClick={navigatePost} /></div>
                        <div className={cl.postUser} onClick={()=>navigate('../profile/'+post1.creatorLogin,{replace:true})}>
                            <img src={post1.creatorAvatar===''?user:post1.creatorAvatar} alt="" />
                            <span className={cl.userLogin}>{post1.creatorLogin}</span>
                        </div>
                        <div className={cl.addInfo}>
                            <div className={cl.date}><img src={dateTime} alt="" />{String(date.date).split('.')[0]} {date.name}</div>
                            <div className={cl.views}><img src={views} alt="" /> <span className={cl.viewsCount}>{post1.viewsCount}</span></div>
                        </div>
                    </div>
                </div>
                <div className={cl.popularUsers}>
                    <div className={cl.popularUsersTitle}>Popular users</div>
                    {users.map(user => <div key={user.login} className={cl.topUser} onClick={()=>navigate("../profile/" + user.login, { replace: true })}>
                        <img src={user.avatar === '' ? user1 : user.avatar} alt="" />
                        <span className={cl.topUserName}>{user.login}</span>
                        <div className={cl.userStat}>
                            <div className={cl.countLikes}><img src={likes} alt="" />{user.likesTotal}</div>
                            <div className={cl.countPosts}><img src={photo} alt="" />{user.postsTotal}</div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;