import React from 'react';
import MyPhotoItem from '../MyPhotoItem/MyPhotoItem';
import emptyposts from '../../assets/emptyposts.png';
import {getTime} from '../../utils/getDate';
import cl from './MyPostList.module.scss';
const MyPostList = ({posts}) => {
    return (
        <div className={cl.postWrapper}>
                {posts.length > 0 ? posts.map(post => <MyPhotoItem creationTime={post.creationTime} getDate={getTime} commsCount={post.commentsCount} key={post.photo} id={post.id} likes={post.likesCount} isliked={post.isLikedByUser} title={post.title} photo={post.photo} author={post.creatorName} avatar={post.creatorAvatar}></MyPhotoItem>) : <div className='empty' style={{ marginTop: -100 }}>
                    <div className='empty__img'><img src={emptyposts} alt="" />
                    </div>
                    <div className='empty__title'>Seems like aren't any posts here</div>
                </div>}
            </div>
    );
};

export default MyPostList;