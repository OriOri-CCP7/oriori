
import { Navigate, useLocation } from 'react-router-dom';
import { UserAuth } from './AuthContext';




function ProtectedRoute({children} : { children: JSX.Element }){
    const auth  = UserAuth();
    const { user }  =  auth!;
   
    let location =useLocation();
    if(!user.uuid) {
        return (<><Navigate to='/' state={{ from: location }} replace></Navigate></>)
    }
    return children;
}

export default ProtectedRoute;