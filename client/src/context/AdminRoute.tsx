import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserAuth } from './AuthContext';
import * as ROLES from '../constants/roles';

const AdminRoute = ({children} : { children: JSX.Element }) => {
  const auth = UserAuth();
  const { role, isLoading } = auth!;
  
  let location = useLocation();
  return !isLoading
    ? (
        role === ROLES.ADMIN
          ? children
          : <Navigate to='/' state={{ from: location }} replace/>
      )
    : null;
};

export default AdminRoute;