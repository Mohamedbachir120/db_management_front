import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { createBrowserRouter,RouterProvider ,Navigate, Routes, Route, BrowserRouter } from'react-router-dom'
import ErrorPage from './app/views/error-page'
import Home from './app/views/Home'
import Login from './app/views/login'
import Protected from './hoc/Protected'
import PrivateWrapper from './hoc/Protected'
import PublicWrapper from './hoc/UnProtected'
import ServeurPage from './app/views/ServeurPage'
import LinkedServerPage from './app/views/LinkedServerPage'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />}/>

      
        <Route path="/login" element={
          <PublicWrapper>
            <Login/>
          </PublicWrapper>   
        }/>  
        <Route path="/home" element={
          <PrivateWrapper>
            <Home/>
          </PrivateWrapper>   
        }/>   
         <Route path="/serveurs" element={
          <PrivateWrapper>
            <ServeurPage/>
          </PrivateWrapper>   
        }/>   
        <Route path="/linked-servers" element={
          <PrivateWrapper>
            <LinkedServerPage/>
          </PrivateWrapper>   
        }/>   
      </Routes>    
    </BrowserRouter>
        
    </Provider>
  </React.StrictMode>,
)
