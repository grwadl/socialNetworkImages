import React, { useState,lazy, Suspense } from 'react';
import cl from './MyPhoto.module.scss';
import MyButton from '../../components/UI/MyButton/MyButton';
import ModalAdd from '../../components/ModalAdd/ModalAdd';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_MY_PAGE, OPEN } from '../../redux/constants/constants';
import { store } from '../../redux/store/store';
import Loader from '../../components/Loader/Loader';
import useToken from '../../hooks/useToken.js';
import { useMyPhoto } from '../../hooks/useMyPhoto';
import AvatarModal from '../../components/AvatarModal/AvatarModal';
import './Pagination.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProfileDetailInfo from '../../components/ProfileDetailInfo/ProfileDetailInfo';
const MyPostList = lazy(() => import('../../components/MyPostList/MyPostList'));
const MyPhoto = () => {
    const login = store.getState().AuthReducer.login;
    const dispatch = useDispatch();
    const posts = useSelector(state => state.MyPostsReducer.posts);
    const isLoading = useSelector(state => state.LoadingReducer.loadingMyPosts);
    const isLoadingNavigate = useSelector(state => state.LoadingReducer.loadingProfile)
    useToken();
    const history = useLocation();
    const page = history.search.split('=')[1];
    const [detailedInfo, setDetailedInfo] = useState({});
    const page1 = useSelector(state => state.PaginationReducer.MyPage);
    const pageNum = page || page1;
    useMyPhoto(login, pageNum, setDetailedInfo);
    const pageCount = useSelector(state => state.PaginationReducer.totalMy);
    const navigate = useNavigate();
    if (isLoading || isLoadingNavigate) {
        return <Loader />
    }
    const refreshMy = (page) => {
        dispatch({ type: CHANGE_MY_PAGE, payload: page });
        navigate('/?pageNum=' + page);
    }

    return (
        <div className={cl.myPhoto}>
            <AvatarModal />
            {(detailedInfo !== undefined) && (pageNum == 1) ? <ProfileDetailInfo props={detailedInfo} /> : ''}
            <MyButton text='Add post' onClick={e => dispatch({ type: OPEN })} />
            <ModalAdd />
            <Suspense fallback={<Loader/>}>
                <MyPostList posts={posts} />
            </Suspense>
            {pageCount > 1 ?
                <Stack className='multistack1'>
                    <Pagination count={pageCount} className='pagination1' size="large" page={parseInt(pageNum)} siblingCount={0} boundaryCount={1}
                        onChange={(_, pageNew) => refreshMy(pageNew)}
                    />
                </Stack> : ''}

        </div>
    );
};

export default MyPhoto;