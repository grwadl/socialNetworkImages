import React, {useState,lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import useToken from '../../hooks/useToken.js';
import cl from './Feed.module.scss';
import { useFeed } from '../../hooks/useFeed';
import AvatarModal from '../../components/AvatarModal/AvatarModal';
import './Pagination.scss';
import {useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CHANGE_FEED_PAGE } from '../../redux/constants/constants';
import ScoreBoard from '../../components/ScroreBoard/ScroreBoar';
import { useScoreBoard } from '../../hooks/useScoreBoard';
import emptyposts from '../../assets/emptyposts.png';
const FeedpostList = lazy(() => import('../../components/FeedPostList/FeedPostList'));
const Feed = () => {
    useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const page1 = useSelector(state => state.PaginationReducer.feedPage);
    const history = useLocation();
    const page2 = history.search.split('=')[1];
    const page = page2 || page1;
    const totalFeed = useSelector(state => state.PaginationReducer.totalFeed);
    useFeed(page);
    const [scoreBoard, setScoreBoard] = useState({})
    useScoreBoard(setScoreBoard);
    const refreshFeed = (page) => {
        dispatch({ type: CHANGE_FEED_PAGE, payload: page });
        navigate('/feed/?pageNum=' + page);
    }
    const isLoading = useSelector(state => state.LoadingReducer.loadingAllPosts);
    const allPosts = useSelector(state => state.AllPostsReducer.posts);
    console.log((scoreBoard.topPosts!==undefined)&&page==1)
    if (isLoading) {
        return <Loader />
    }
    if (allPosts.length === 0) {
        return <div className='empty'>
            <div className='empty__img'><img src={emptyposts} alt="" /></div>
            <div className='empty__title'>Seems like aren't any posts here</div>
        </div>  
    }
    
    return (
        <div className={cl.feed}>
            <AvatarModal />
            {(scoreBoard.topPosts!==undefined)&&(page==1)&&(scoreBoard.topPosts.length!==0)?<ScoreBoard post1={scoreBoard.topPosts[0]} users={scoreBoard.topUsers}/>:''}
            <Suspense fallback={<Loader/>}>
                <FeedpostList page={page} allPosts={allPosts}/>
            </Suspense>
            {totalFeed>1?<Stack className='multistack'>
                <Pagination count={totalFeed} className='pagination' size="large" page={parseInt(page)} siblingCount={0} boundaryCount={1}
                    onChange={(_, pageNew) => refreshFeed(pageNew)}
                />
            </Stack>:''}
            
        </div>
    );
};

export default Feed;