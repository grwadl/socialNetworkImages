import AuthPage from "../pages/AuthPage/AuthPage";
import MainPage from "../pages/MainPage/MainPage";
import Page404 from "../pages/Page404/Page404";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
export const publicRoutes = [{ path: '/login', element: <AuthPage /> }, { path: '/registration', element: <SignUpPage /> },{ path: '/*', element: <Page404 /> }]
export const privateRoutes = [{ path: '/', element: <MainPage /> }]