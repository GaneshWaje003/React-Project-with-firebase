import React, { useState } from 'react'
import '../css/login.css'
import google_logo from '../img/google_logo.svg'
import Navbar from '../comp/Navbar'
import { auth , googleProvider } from '../../config/firebase'
import { createUserWithEmailAndPassword ,signOut , signInWithPopup} from 'firebase/auth'

export default function Login() {

    const [userData,setUserData] =useState({
            email:'',
            password:'',
    });

    const [curruser,setCurrUser]=useState();
    const [currUserImgUrl,setCurrUserImgUrl]=useState();
    
    const handleChange =(e)=>{
        
        setCurrUser(auth.currentUser?.email);
        changeProfileUrl();

        setUserData({
            ...userData,
            [e.target.name]:e.target.value,
        });

        console.log(auth.currentUser?.email);

    };

    const writeData = async  ()=>{
        try{
            await createUserWithEmailAndPassword(auth,userData.email,userData.password);
        }catch(err){
            console.log(err);
        }        
    }

    const googleSignIn = async () =>{
        try{
            await signInWithPopup(auth,googleProvider).then(()=>{
                console.log("google sign in succesful");
            });
        }catch(err){
            console.log("error at signwithGOogle : ",err);
        }
        await changeProfileUrl();
        
    }

    const changeProfileUrl = async () =>{
      await setCurrUserImgUrl(auth?.currentUser?.photoURL)
    }

 

    return (
        <div className='login-main'>

            <div className="navbar">
                <Navbar/>
            </div>

            <div className="login-main-contianer">
                <div className="login-container">

                    <div className="login-elements">

                        <p className='login-header'>Login Page</p>

                        <div  className="input-login username">
                            <input name="email" onChange={(e)=>handleChange(e)} type="text" placeholder='Username' />
                        </div>
                        <div className="input-login password">
                            <input name='password' onChange={(e)=>handleChange(e)} type="password" placeholder='Password'/>
                            <a href="#">forgot passord</a>
                        </div>

                        <div className="login-button">
                            <button onClick={()=>writeData()} >Login</button>
                        </div>

                        <div onClick={googleSignIn} className="login-with-google">
                            <img src={google_logo} alt="" />
                            <p>Login With Google</p>
                        </div>

                    </div>  

                    <div className="other-section">
                            
                            <div className="other-section-data">

                            <img src={currUserImgUrl} alt="" />
                            
                            <p>{curruser}</p>
                            <p>Welcome To</p>
                            <p>MOvies</p>

                            </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
