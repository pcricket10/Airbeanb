
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
          <button className='nav-button'> AirBeanB</button>
        </NavLink>
        {sessionUser && (
          <Popup trigger={<button className='nav-button'>AirBeanB your Beans</button>}
            modal nested>
            {close => <PostForm close={close} />}
          </Popup>
        )}

        <table className='bean-list'>
          <tr>
            <td>Beanfront</td>
            <td>Beans</td>
            <td>Bean Cabins</td>
            <td>Amazing Beans</td>
            <td>Bean farms</td>
            <td>Bean Golf</td>
            <td>Big Beans</td>
            <td>Water Beans</td>
            <td>Swimming in Beans</td>
            <td>OMB!</td>
            <td>Beanhouses</td>
            <td>Tiny Beans</td>
            <td>Hot Beans</td>
            <td>Lake Beans</td>
            <td>Bean Castles</td>
            <td>Fun Beans</td>
            <td>Fancy Beans</td>
            <td>Free-Range Beans</td>
            <td>Island Beans</td>
            <td>Bean Containers</td>
            <td>Lake Beans</td>
            <td>House Beans</td>
            <td>Yeehaw Beans</td>
            <td>Bean Camping</td>
            <td>Bean Domes</td>
            <td>Tropical Beans</td>

          </tr>
        </table>
      </div>


      <div className='hamburger-menu' onClick={handleMenuClick}><p className='hamburger-text'>{sessionUser ? sessionUser.username : "Log In"}</p>
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

                <Popup trigger={<button className='nav-button'>AirBeanB your Beans</button>}
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
