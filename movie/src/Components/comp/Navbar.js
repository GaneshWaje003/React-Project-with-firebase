import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../css/navbar.css'
import {signOut} from 'firebase/auth'
import { auth } from '../../config/firebase'

export default function Navbar() {

  const setDarkMode = ()=>{
    document.querySelector("body").setAttribute('data-theme','dark');
  }

  const logout = () =>{
      signOut(auth).then(()=>{
        console.log("logout success");
      }).catch((err)=>{
        console.log("err happen at logout : ",err);
      });
  }

  const setLightMode = ()=>{
    document.querySelector("body").setAttribute('data-theme','light');
  }

  const [theme,setTheme]=useState(false);

  const changeTheme =()=>{
      if(theme){
        setLightMode();
        setTheme(false);
      }else{
        setDarkMode();
        setTheme(true);
      }
  }


  return (
    <div className='main-navbar'>
      <nav>
        <ul>
            <li><NavLink to='/' >Home</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
        </ul>

        <div className="other-members">
        <p onClick={()=>changeTheme()} >mode</p>
        <p onClick={()=>logout()} >Logout</p>
        </div>

      </nav>
    </div>
  )
}
