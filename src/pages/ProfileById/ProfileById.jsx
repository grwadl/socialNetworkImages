import React, { useEffect,lazy,Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MyApi } from '../../API/API';
import ProfileDetailInfo from '../../components/ProfileDetailInfo/ProfileDetailInfo';
import cl from './ProfileById.module.scss';
import Loader from '../../components/Loader/Loader';
import { DESTROY_PROFILE, END_LOADING_PROFILE, SET_PROFILE_PAGE, START_LOADING_PROFILE } from '../../redux/constants/constants';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useToken from '../../hooks/useToken';
import './Pagination.scss'
import emptyposts from '../../assets/emptyposts.png';
const ProfileByidPostList = lazy(() => import('../../components/ProfileByidPostList/ProfileByidPostList'));
const ProfileById = () => {
    useToken()
    const params = useParams();
    const login = params.login;
    const userLogin = useSelector(state => state.AuthReducer.login)
    const detailedInfo = useSelector(state => state.PostsInProfileReducer.detailedInfo);
    const dispatch = useDispatch();
    const page1 = useSelector(state => state.PaginationReducer.profileByIdPage);
    const history = useLocation();
    const page2 = history.search.split('=')[1];
    const pageNum = page2 || page1;
    const loading = useSelector(state => state.LoadingReducer.loadingProfile);
    const navigate = useNavigate();
    useEffect(() => {
        if (userLogin == login) {
            dispatch({ type: START_LOADING_PROFILE });
            navigate('../', { replace: true });
            dispatch({ type: END_LOADING_PROFILE });
        }
        else {
            dispatch({ type: START_LOADING_PROFILE });
            dispatch(MyApi.getProfileInfo(login, pageNum));
        }
        return () => {
            dispatch({ type: DESTROY_PROFILE });
            dispatch({type:SET_PROFILE_PAGE, payload:1})
        }

    }, [login,pageNum]);
    const totalPages = useSelector(state => state.PostsInProfileReducer.totalPages);
    const posts = useSelector(state => state.PostsInProfileReducer.posts);
    const refreshFeed = (page) => {
        dispatch({ type: SET_PROFILE_PAGE, payload: page });
        navigate(`/profile/${login}?pageNum=${page}`);
    }
    if (loading) {
        return <Loader />
    }
    if (posts.length === 0) {
        return <div className='empty'>
            <div className='empty__img'><img src={emptyposts} alt="" /></div>
            <div className='empty__title'>Seems like aren't any posts here</div>
        </div>  
    }
    return (
        <div className={cl.profileIdInfo}>
            {pageNum==1?<ProfileDetailInfo props={detailedInfo} />:''}
            <div className={cl.postsByUser}>Posts</div>
            <Suspense fallback={<Loader/>}>
                <ProfileByidPostList posts={posts} />
                </Suspense>
            {totalPages>1?<Stack className='multistack2'>
                <Pagination count={totalPages} className='pagination2' size="large" page={parseInt(pageNum)} siblingCount={0} boundaryCount={1}
                    onChange={(_, pageNew) => refreshFeed(pageNew)}
                />
            </Stack>:''}
            
        </div>
    );
};

export default ProfileById;