
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css";
import PostForm from './PostForm';

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <ul className='nav-button-container'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <button className='nav-button'> Home</button>
          </NavLink>
        </li>
        {!sessionUser && (
          <>

            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                <button className='nav-button'>Login </button>
              </NavLink>

            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                <button className='nav-button'>Sign Up </button>
              </NavLink>

            </li>
          </>
        )}
        {sessionUser && (
          <>
            <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
                <button className='nav-button'> Users </button>
              </NavLink>
            </li>

            <li>
              {/* <NavLink to='/posts/new'>
                <button className='nav-button'>New</button>
              </NavLink> */}
              <Popup trigger={<button className='nav-button'>New</button>}
                modal nested>
                <PostForm />
              </Popup>
            </li>

            <li>
              <LogoutButton />
            </li>
          </>
        )}



      </ul>
    </nav>
  );
}

export default NavBar;
