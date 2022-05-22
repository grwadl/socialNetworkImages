import { Navigate, useLocation } from "react-router-dom"

const RequireAuth = ({ children, isAuth }) => {
    const location = useLocation();
    console.log(isAuth);
    if (!isAuth) {
        return <Navigate to='/login' state={{from:location}}/>
    }
    return children;
}
export {RequireAuth}