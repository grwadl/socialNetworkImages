import './App.scss';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useAuth } from './hooks/useAuth';
import Loader from './components/Loader/Loader';
import MainPage from './pages/MainPage/MainPage';
import MyPhoto from './pages/MyPhoto/MyPhoto';
import FAQ from './pages/FAQ/FAQ';
import PostById from './pages/PostById/PostById';
import ProfileById from './pages/ProfileById/ProfileById';
import Feed from './pages/Feed/Feed';
import Page404 from './pages/Page404/Page404';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { RequireAuth } from './utils/requireAuth';
import { ReqirectAuthed } from './utils/redirectAuthed';
function App() {
  const isLoading = useSelector(state => state.LoadingReducer.loadingAuth);
  const isAuth = useSelector(state => state.AuthReducer.isAuth);
  useAuth();
  return (
    <div className="App">
      <HashRouter>
        {isLoading ? <Loader /> : <Routes> <Route path='*' element={<MainPage />}>
          <Route index element={
            <RequireAuth isAuth={isAuth}><MyPhoto /></RequireAuth>
          } />
          <Route path='feed' element={<RequireAuth isAuth={isAuth}><Feed /></RequireAuth>} />
          <Route path='feed/:id' element={<RequireAuth isAuth={isAuth}><PostById /></RequireAuth>} />
          <Route path='faq' element={<RequireAuth isAuth={isAuth}><FAQ /></RequireAuth>} />
          <Route path='profile/:login' element={<RequireAuth isAuth={isAuth}><ProfileById /></RequireAuth>} />
          <Route path='*' element={<Page404 />} />
          <Route path='login' element={<ReqirectAuthed isAuth={isAuth}><AuthPage /></ReqirectAuthed>} />
          <Route path='registration' element={<ReqirectAuthed isAuth={isAuth}><SignUpPage /></ReqirectAuthed>} />
        </Route>
        </Routes>}
      </HashRouter>
    </div>
  );
}

export default App;
