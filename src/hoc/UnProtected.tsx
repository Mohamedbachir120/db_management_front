import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { AuthState } from '../features/auth/auth-slice';

const PublicWrapper = ({ children }: { children: JSX.Element }) => {
  const auth = useAppSelector((state: { auth: AuthState })=> state.auth)
  return auth.isAuthenticated ? <Navigate to="/home" replace /> :children ;
};
export default PublicWrapper