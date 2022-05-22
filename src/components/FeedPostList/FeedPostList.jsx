import React from 'react';
import { getTime } from '../../utils/getDate';
import PostItem from '../PostItem/PostItem';
import cl from './FeedPostList.module.scss'
const FeedPostList = ({page,allPosts}) => {
    return (
        <div className={cl.feedWrapper}>
                {page==1?<div className={cl.feedTitle}>Feed</div>:''}
                <div className={cl.postList}>
                    {allPosts.length > 0 ? allPosts.map(post => <PostItem creationTime={post.creationTime} getDate={getTime} commsCount={post.commentsCount} key={post.photo} isliked={post.isLikedByUser} likes={post.likesCount} id={post.id} title={post.title} photo={post.photo} avatar={post.creatorAvatar} author={post.creatorLogin} />) : ''}
                </div>
            </div>
    );
};

export default FeedPostList;