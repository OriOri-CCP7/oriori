import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserAuth } from './AuthContext';

function AdminRoute({children} : { children: JSX.Element }){
    const auth  = UserAuth();
    const { user, isLoading }  =  auth!;
   
    let location = useLocation();
    return !isLoading
        ? (user.uuid ? children : <Navigate to='/' state={{ from: location }} replace/>)
        : null;
}

export default AdminRoute;