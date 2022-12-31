import React from 'react'
import { useAppDispatch } from '../hooks'
import { signOut } from '../../features/auth/auth-slice';
import { loginParams, useLogoutMutation } from '../../features/login/login';

const Home = () => {
  const dispatch  = useAppDispatch();
  const [logout,{isLoading}] = useLogoutMutation();


  return (
    <div>home

      <div>
        <button onClick={() => {
          logout("")
          
          }}>Sign out</button>
        

      </div>
    </div>
  )
}

export default Home