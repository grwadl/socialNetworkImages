import { Navigate } from "react-router-dom";

const ReqirectAuthed = ({ children, isAuth }) => {
    if (isAuth) {
        return <Navigate to='/' replace />
    }
    return children;
}
export {ReqirectAuthed}