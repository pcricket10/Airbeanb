
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css";
import PostForm from './PostForm';

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = e => {
    setMenuOpen(!menuOpen)//toggle
  }
  return (
    <nav>
      <div className='nav-button-container'>
        <NavLink to='/' exact={true} activeClassName='active'>
          <button className='nav-button'> Home</button>
        </NavLink>
      </div>
      <div className='hamburger-menu' onClick={handleMenuClick}><p className='hamburger-text'>|||___(0)</p>
        {menuOpen && (
          <div className='dropped-menu'>
            {!sessionUser && (
              <>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  <button className='nav-button'>Login </button>
                </NavLink>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  <button className='nav-button'>Sign Up </button>
                </NavLink>
              </>

            )}
            {sessionUser && (
              <>

                <Popup trigger={<button className='nav-button'>New</button>}
                  modal nested>
                  {close => <PostForm close={close} />}
                </Popup>
                <LogoutButton />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
