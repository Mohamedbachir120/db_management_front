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
import AccessPage from './app/views/AccessPage'
import SgbdPage from './app/views/SgbdPage'
import ProjectPage from './app/views/ProjectPage'
import ResponsablePage from './app/views/ResponsablePage'
import { Population } from './features/population/population'
import PopulationPage from './app/views/PopulationPage'
import BddPage from './app/views/BddPage'
import LinkedDBProjectPage from './app/views/linked_objects/LinkDBProjectPage'
import LinkedProjectResponsable from './app/views/linked_objects/linkProjetsResponsable'
import LinkedProjectPopulation from './app/views/linked_objects/linkProjetsPopulation'
import LinkedAccessResponsable from './app/views/linked_objects/linkResponsableAccess'
import LinkedBDAccess from './app/views/linked_objects/linkDBAccess'
import { Privillege } from './features/privillege/privillege'
import PrivillegePage from './app/views/Privillege'
import LinkedAccessPrevillege from './app/views/linked_objects/linkAccessPrevillege'
import LinkedPrevillegeAccess from './app/views/linked_objects/linkPrevillegeAccess'
import Profil from './app/views/ProfilPage'


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
          <Route path="/profil" element={
          <PrivateWrapper>
            <Profil/>
          </PrivateWrapper>   
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
         <Route path="/access" element={
          <PrivateWrapper>
            <AccessPage/>
          </PrivateWrapper>   
        }/>   
         <Route path="/sgbd" element={
          <PrivateWrapper>
            <SgbdPage/>
          </PrivateWrapper>   
        }/>
        <Route path="/linked-servers" element={
          <PrivateWrapper>
            <LinkedServerPage/>
          </PrivateWrapper>   
        }/>   
         <Route path="/project" element={
          <PrivateWrapper>
            <ProjectPage/>
          </PrivateWrapper>   
        }/> 
         <Route path="/responsables" element={
          <PrivateWrapper>
            <ResponsablePage/>
          </PrivateWrapper>   
        }/> 
         <Route path="/populations" element={
          <PrivateWrapper>
            <PopulationPage />
          </PrivateWrapper>   
        }/> 
        <Route path="/bdd" element={
          <PrivateWrapper>
            <BddPage />
          </PrivateWrapper>   
        }/>
         <Route path="/privillege" element={
          <PrivateWrapper>
            <PrivillegePage />
          </PrivateWrapper>   
        }/>
        <Route path="/project/databases/:id" element={
          <PrivateWrapper>
          <LinkedDBProjectPage   />
        </PrivateWrapper>   
        } 
        
        />
          <Route path="/project/responsables/:id" element={
          <PrivateWrapper>
          <LinkedProjectResponsable   />
        </PrivateWrapper>   
        } />
          <Route path="/project/populations/:id" element={
          <PrivateWrapper>
          <LinkedProjectPopulation   />
        </PrivateWrapper>   
        } />
          <Route path="/responsable/access/:id" element={
          <PrivateWrapper>
          <LinkedAccessResponsable   />
        </PrivateWrapper>   
        } />
        <Route path="/bdd/access/:id" element={
          <PrivateWrapper>
          <LinkedBDAccess   />
        </PrivateWrapper>   
        } />
         <Route path="/previllege/access/:id" element={
          <PrivateWrapper>
          <LinkedAccessPrevillege   />
        </PrivateWrapper>   
        } />
         <Route path="/access/previllege/:id" element={
          <PrivateWrapper>
          <LinkedPrevillegeAccess   />
        </PrivateWrapper>   
        } />
        
      </Routes>    
    </BrowserRouter>
        
    </Provider>
  </React.StrictMode>,
)
