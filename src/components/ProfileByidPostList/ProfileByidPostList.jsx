import React from 'react';
import { getTime } from '../../utils/getDate';
import cl from './ProfileByidPostList.module.scss';
import emptyposts from '../../assets/emptyposts.png';
import PostsInProfile from '../PostsInProfile/PostsInProfile';
const ProfileByidPostList = ({posts}) => {
    return (
        <div className={cl.postList}>
                {posts !== undefined ? posts.map(post => <PostsInProfile creationTime={post.creationTime} getDate={getTime} commsCount={post.commentsCount} key={post.photo}  id={post.id} title={post.title} photo={post.photo} avatar={post.creatorAvatar} author={post.creatorLogin} />) : <div className='empty' style={{ marginTop: -100 }}>
                    <div className='empty__img'><img src={emptyposts} alt="" />
                    </div>
                    <div className='empty__title'>Seems like aren't any posts here</div>
                </div>}
            </div>
    );
};

export default ProfileByidPostList;