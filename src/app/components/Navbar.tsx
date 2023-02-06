import React from 'react'
import "./../../dashboard.css";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo-color.svg";
import { faPeopleGroup,faHome,faServer, faSignOut , faListCheck, faLink,faKey,faGear , faPerson , faDatabase , faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogoutMutation } from '../../features/login/login';
import { useAppDispatch } from '../hooks';
import { signOut } from '../../features/auth/auth-slice';

export default function Navbar({active }:{active:string}) {
  const [logout,{isLoading}] = useLogoutMutation();
  const dispatch = useAppDispatch();

  return (
    <div className='ps-5 shadow navbar d-flex flex-column align-items-start justify-content-start'>
      <img src={logo} alt="" className='logo' height={90} />
      <ul className='main-links'>
        <li className={ "home" == active ? 'active' : "" }> 
          <Link to="/home" ><FontAwesomeIcon icon={faHome} /> Accueil</Link>

        </li>
        <li className={ "serveur" == active ? 'active' : "" }>
          <Link to="/serveurs"><FontAwesomeIcon icon={faServer} /> Serveurs</Link>
        </li>
        <li className={ "linked-server" == active ? 'active' : "" }>
          <Link to="/linked-servers"><FontAwesomeIcon icon={faLink} /> Linked Servers</Link>
        </li>
        <li className={ "bdd" == active ? 'active' : "" }>
          <Link to="/bdd"><FontAwesomeIcon icon={faDatabase} /> BDD</Link>
        </li>
        <li className={ "access" == active ? 'active' : "" }>
          <Link to="/access"><FontAwesomeIcon icon={faKey} /> Accès</Link>
        </li>
        <li className={ "privillege" == active ? 'active' : "" }>
          <Link to="/privillege"><FontAwesomeIcon icon={faLock} /> Privillège</Link>
        </li>
        <li className={ "sgbd" == active ? 'active' : "" }>
          <Link to="/sgbd"><FontAwesomeIcon icon={faDatabase} /> SGBD</Link>
        </li>
        <li className={ "project" == active ? 'active' : "" }>
          <Link to="/project"><FontAwesomeIcon icon={faListCheck} /> Projets</Link>
        </li>
        <li className={ "responsables" == active ? 'active' : "" }>
          <Link to="/responsables"><FontAwesomeIcon icon={faPerson} /> Responsable</Link>
        </li>
        <li className={ "populations" == active ? 'active' : "" }>
          <Link to="/populations"><FontAwesomeIcon icon={faPeopleGroup} /> Population</Link>
        </li>
      </ul>
      <div className='line'>

      </div>
      <ul className='secondary-links'>
      <li className={ "profil" == active ? 'active' : "" }>
          <Link to="/profil"><FontAwesomeIcon icon={faUser} /> Profile</Link>
        </li>
       
        <li className={ "responsables" == active ? 'active' : "" }>
          <Link to="/signout" onClick={(e)=>{
            e.preventDefault();
            try {
              
              logout("");
              dispatch(signOut());
            } catch (error) {
              dispatch(signOut());
              
            }
          }}  ><FontAwesomeIcon icon={faSignOut} /> Déconnexion</Link>
        </li>
    </ul>
    </div>
  )
}
