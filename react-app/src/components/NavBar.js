
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css";
import PostForm from './PostForm';

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const [menuOpen, setMenuOpen] = useState('false');
  const handleMenuClick = e => {
    setMenuOpen(!menuOpen)//toggle
  }
  return (
    <nav>
      <ul className='nav-button-container'>
        <NavLink to='/' exact={true} activeClassName='active'>
          <button className='nav-button'> Home</button>
        </NavLink>
        <div className='hamburger-menu' onClick={handleMenuClick}><p>MENU</p>
          {menuOpen && (
            <ul>
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

                    <Popup trigger={<button className='nav-button'>New</button>}
                      modal nested>
                      {close => <PostForm close={close} />}
                    </Popup>
                  </li>

                  <li>
                    <LogoutButton />
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
