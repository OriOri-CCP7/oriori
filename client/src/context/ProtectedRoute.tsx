import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserAuth } from './AuthContext';

function ProtectedRoute({children} : { children: JSX.Element }){
    const auth  = UserAuth();
    const { user, loadComplete }  =  auth!;
   
    let location = useLocation();
    return loadComplete
        ? (user.uuid ? children : <Navigate to='/' state={{ from: location }} replace/>)
        : null;
}

export default ProtectedRoute;