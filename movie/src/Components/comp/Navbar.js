import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../css/navbar.css'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import searchLogo from '../img/search.svg'
import { useNavigate } from 'react-router-dom';


export default function Navbar({ imgInfo }) {

  const navigate = useNavigate();

  const [userProfileUrl, setUserProfileUrl] = useState();
  const [imgData, setImgData] = useState({});

  useEffect(() => {

    const UserLoggedIn = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserProfileUrl(user.photoURL);
      }
    })

  }, []);


  // sending data to list all
  const listAllMovies = (sendState,name) => {
    navigate('/listAllMovies', { state: { sendState,name } })
  }


  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'dark');
  }

  const logout = () => {
    if (auth.currentUser) {
      signOut(auth).then(() => {
        console.log("logout success");
        setUserProfileUrl(null);
        navigate('/');
      }).catch((err) => {
        console.log("err happen at logout : ", err);
      });
    } else {
      navigate('/');
      console.log("Already signout ");
    }
  }

  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'light');
  }

  const [theme, setTheme] = useState(false);

  const changeTheme = () => {
    if (theme) {
      setLightMode();
      setTheme(false);
    } else {
      setDarkMode();
      setTheme(true);
    }
  }


  return (
    <div className='main-navbar'>
      <nav>


        <ul>

        <div className="title-website">
            <h2>MoviesHub</h2>
        </div>

          <li  ><NavLink className='toHover' to='/' >Home</NavLink></li>
          <li  ><NavLink className='toHover' to='/login'>Login</NavLink></li>
          <li>
            <div className="dropdown">
              <a className='hover-for-menu' href="#">Type</a>
              <div className="dropdown-options">
              <a href='#' onClick={(e) => { e.preventDefault(); listAllMovies(imgInfo.hollywood,"Hollywood"); }}>Hollywood</a>
              <a href='#' onClick={(e) => { e.preventDefault(); listAllMovies(imgInfo.bollywood,"Bollywood"); }}>Bollywood</a>
              <a href='#' onClick={(e) => { e.preventDefault(); listAllMovies(imgInfo.south,"South"); }}>south</a>
              </div>
            </div>
          </li>
          <li>

            <div className="search-container">
              <img src={searchLogo} alt="" />
              <input type="text" placeholder='Search' />
            </div>
          </li>
        </ul>

        <div className="other-members">
          <p onClick={() => changeTheme()} >mode</p>

          <div onClick={() => logout()} className="logout-section">
            {userProfileUrl && <img src={userProfileUrl} alt="" />}
            <label >Logout</label>
          </div>
        </div>

      </nav>
    </div>
  )
}
