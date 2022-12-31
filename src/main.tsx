import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { createBrowserRouter,RouterProvider ,createRoutesFromElements, Routes, Route, BrowserRouter } from'react-router-dom'
import ErrorPage from './app/views/error-page'
import Home from './app/views/Home'
import Login from './app/views/login'
import Protected from './hoc/Protected'
import PrivateWrapper from './hoc/Protected'
import PublicWrapper from './hoc/UnProtected'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>

      
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
      </Routes>    
    </BrowserRouter>
        
    </Provider>
  </React.StrictMode>,
)
